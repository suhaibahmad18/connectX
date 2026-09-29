import { create } from "zustand";

const mergeById = (older, newer) => {
  const seen = new Set(older.map((m) => m._id));
  return [...older, ...newer.filter((m) => !seen.has(m._id))];
};

const useConversation = create((set) => ({
  // The selected chat partner (a user object); the conversation itself is identified by conversationId.
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set((state) =>
      state.selectedConversation?._id === selectedConversation?._id
        ? state
        : {
            selectedConversation,
            conversationId: null,
            messages: [],
            nextCursor: null,
            hasMore: false,
          }
    ),
  conversationId: null,
  setConversationId: (conversationId) => set({ conversationId }),
  messages: [],
  nextCursor: null,
  hasMore: false,
  // Keeps any socket messages that arrived while the first page was loading.
  setFirstPage: ({ messages, nextCursor, hasMore }) =>
    set((state) => ({ messages: mergeById(messages, state.messages), nextCursor, hasMore })),
  prependOlder: ({ messages, nextCursor, hasMore }) =>
    set((state) => ({ messages: mergeById(messages, state.messages), nextCursor, hasMore })),
  appendMessage: (message) =>
    set((state) =>
      state.messages.some((m) => m._id === message._id)
        ? state
        : { messages: [...state.messages, message] }
    ),
}));
export default useConversation;
