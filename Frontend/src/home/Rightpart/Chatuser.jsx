import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import Avatar from "../../assets/avatar.avif";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  if (!selectedConversation) return null;

  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <div className="pl-5 pt-5 h-[12vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300 items-center">
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-14 rounded-full overflow-hidden">
          <img src={Avatar} alt="Chat Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold">
          {selectedConversation.fullname || "Unknown User"}
        </h1>
        <span className="text-sm">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
