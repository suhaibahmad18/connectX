import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

const toConversationDto = (conversation) => ({
  _id: conversation._id,
  type: conversation.type,
  members: conversation.members,
  name: conversation.name,
  createdAt: conversation.createdAt,
  updatedAt: conversation.updatedAt,
});

export const startPrivateConversation = async (req, res, next) => {
  const { userId } = req.valid.body;
  const me = req.user._id;

  try {
    if (String(me) === userId) {
      return res.status(400).json({ error: "You cannot start a conversation with yourself" });
    }
    if (!(await User.exists({ _id: userId }))) {
      return res.status(404).json({ error: "User not found" });
    }

    const conversation = await Conversation.findOrCreatePrivate(me, userId);
    res.status(200).json({ conversation: toConversationDto(conversation) });
  } catch (error) {
    next(error);
  }
};
