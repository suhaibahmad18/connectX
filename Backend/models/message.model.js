import mongoose from "mongoose";

export const MESSAGE_MAX_LENGTH = 2000;

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: MESSAGE_MAX_LENGTH,
    },
  },
  { timestamps: true }
);

// Serves the paginated history query: equality on conversationId, then newest-first by (createdAt, _id).
messageSchema.index({ conversationId: 1, createdAt: -1, _id: -1 });

const Message = mongoose.model("message", messageSchema);

export default Message;
