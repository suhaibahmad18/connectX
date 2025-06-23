import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null); // Clear on unmount
  }, [setSelectedConversation]);

  return (
    <div className="w-full bg-slate-800 text-gray-300">
      {!selectedConversation ? (
        <NoChat />
      ) : (
        <>
          <Chatuser />
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "calc(88vh - 8vh)" }}
          >
            <Messages />
          </div>
          <Type />
        </>
      )}
    </div>
  );
}

export default Right;

const NoChat = () => {
  const [authUser] = useAuth();

  return (
    <div className="flex h-screen items-center justify-center text-center">
      <h1 className="font-semibold text-xl px-4">
        Welcome <span className="text-blue-400">{authUser.user.name}</span>
        <br />
        <span className="text-gray-400">Select a chat to start messaging.</span>
      </h1>
    </div>
  );
};
