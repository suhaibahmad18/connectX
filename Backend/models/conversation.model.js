import mongoose from "mongoose";

export const CONVERSATION_TYPES = ["private"];

const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: CONVERSATION_TYPES,
      default: "private",
      required: true,
    },
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      validate: {
        validator: (members) => members.length >= 2,
        message: "A conversation needs at least two members",
      },
    },
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    // Sorted "<userId>:<userId>" for private chats; the unique index makes find-or-create race-safe.
    pairKey: {
      type: String,
    },
  },
  { timestamps: true }
);

conversationSchema.index(
  { pairKey: 1 },
  { unique: true, partialFilterExpression: { pairKey: { $type: "string" } } }
);
conversationSchema.index({ members: 1 });

conversationSchema.statics.findOrCreatePrivate = async function (userA, userB) {
  const members = [String(userA), String(userB)].sort();
  const pairKey = members.join(":");
  const filter = { type: "private", pairKey };

  try {
    return await this.findOneAndUpdate(
      filter,
      { $setOnInsert: { members } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  } catch (error) {
    if (error?.code === 11000) return this.findOne(filter);
    throw error;
  }
};

const Conversation = mongoose.model("conversation", conversationSchema);
export default Conversation;
