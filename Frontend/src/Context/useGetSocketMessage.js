import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import { useAuth } from "./AuthProvider";
import useConversation from "../statemanage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const [authUser] = useAuth();
  const myId = authUser?.user?._id;

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (newMessage.senderId !== myId) {
        new Audio(sound).play().catch(() => {});
      }
      const { conversationId, appendMessage } = useConversation.getState();
      if (newMessage.conversationId === conversationId) {
        appendMessage(newMessage);
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, myId]);
};
export default useGetSocketMessage;
