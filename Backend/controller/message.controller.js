import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { encodeCursor } from "../validation/schemas.js";
import { emitToUsers } from "../SocketIO/server.js";

// Non-members get the same 404 as a missing conversation, so conversation ids can't be probed.
const findMemberConversation = (conversationId, userId) =>
  Conversation.findOne({ _id: conversationId, members: userId }).select("members").lean();

const toMessageDto = (message) => ({
  _id: message._id,
  conversationId: message.conversationId,
  senderId: message.senderId,
  message: message.message,
  createdAt: message.createdAt,
  updatedAt: message.updatedAt,
});

export const getMessages = async (req, res, next) => {
  const { conversationId } = req.valid.params;
  const { limit, cursor } = req.valid.query;

  try {
    if (!(await findMemberConversation(conversationId, req.user._id))) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const filter = { conversationId };
    if (cursor) {
      filter.$or = [
        { createdAt: { $lt: cursor.createdAt } },
        { createdAt: cursor.createdAt, _id: { $lt: cursor.id } },
      ];
    }

    const docs = await Message.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = docs.length > limit;
    const page = hasMore ? docs.slice(0, limit) : docs;

    res.status(200).json({
      messages: page.reverse().map(toMessageDto),
      nextCursor: hasMore ? encodeCursor(page[0]) : null,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  const { conversationId } = req.valid.params;
  const { message } = req.valid.body;
  const senderId = req.user._id;

  try {
    const conversation = await findMemberConversation(conversationId, senderId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const newMessage = toMessageDto(
      await Message.create({ conversationId, senderId, message })
    );

    // Sent to every member, including the sender's other tabs; clients de-duplicate by _id.
    emitToUsers(conversation.members, "newMessage", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};
