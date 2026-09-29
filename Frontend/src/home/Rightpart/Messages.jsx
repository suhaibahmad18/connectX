import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../Context/useGetMessage.js";
import Loading from "../../Components/Loading.jsx";
import useGetSocketMessage from "../../Context/useGetSocketMessage.js";
function Messages() {
  const { loading, messages, hasMore, loadingOlder, loadOlder } = useGetMessage();
  useGetSocketMessage(); // listing incoming messages

  const lastMsgRef = useRef();
  const lastMessageId = messages[messages.length - 1]?._id;
  // Scroll only when the newest message changes, not when older pages are prepended.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [lastMessageId]);
  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {!loading && hasMore && (
        <div className="text-center py-2">
          <button
            type="button"
            className="btn btn-xs btn-ghost"
            onClick={loadOlder}
            disabled={loadingOlder}
          >
            {loadingOlder ? "Loading..." : "Load older messages"}
          </button>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
