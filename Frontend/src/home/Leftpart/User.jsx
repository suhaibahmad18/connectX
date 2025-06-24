import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import avatar from "../../assets/avatar.avif";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 items-center cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={avatar} alt="User Avatar" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-white">{user.fullname || "No Name"}</h1>
          <span className="text-gray-300 text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
