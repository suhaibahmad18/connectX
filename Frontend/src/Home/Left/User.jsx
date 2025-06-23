import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import avatar from "../../assets/avatar.avif";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-7 cursor-pointer items-center">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src={avatar} alt={user?.name || "User Avatar"} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-bold text-white">{user?.name || "Unknown User"}</h1>
          <span className="text-gray-300 text-sm">{user?.email || "No email provided"}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
