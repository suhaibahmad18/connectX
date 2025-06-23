import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Type() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message.trim());
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-3 h-[8vh] text-center bg-gray-800">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here"
            className="px-3 py-3 mt-1 rounded-xl border-[1px] border-gray-700 bg-slate-900 flex items-center w-full grow outline-none"
          />
        </div>
        <button
          type="submit"
          className="text-3xl disabled:opacity-50"
          disabled={loading || !message.trim()}
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
}

export default Type;
