import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../statemanage/useConversation.js";
import api from "../lib/api.js";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  // Returns true on success so the caller only clears the input when the message was accepted.
  const sendMessages = async (message) => {
    const { conversationId, appendMessage } = useConversation.getState();
    if (!conversationId || !message.trim()) return false;

    setLoading(true);
    try {
      const res = await api.post(`/api/message/${conversationId}`, { message });
      appendMessage(res.data);
      return true;
    } catch (error) {
      console.log("Error in send messages", error);
      toast.error(error.response?.data?.error || "Failed to send message");
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;
