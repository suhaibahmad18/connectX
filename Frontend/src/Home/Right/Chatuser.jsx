import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import Avatar from "../../assets/avatar.avif";

function Chatuser() {
  const { selectedConversation } = useConversation();
  console.log(selectedConversation); // debug

  if (!selectedConversation) return null;

  return (
    <div className="pl-5 pt-5 h-[12vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300 items-center">
      <div className="w-14 h-14 rounded-full overflow-hidden">
        <img
          src={Avatar}
          alt="Chat Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-xl font-semibold">
          {selectedConversation.name || "Unknown User"}
        </h1>
        <span className="text-sm">Online</span>
      </div>
    </div>
  );
}

export default Chatuser;
