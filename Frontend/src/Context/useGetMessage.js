import { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import api from "../lib/api.js";

const PAGE_SIZE = 30;

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const {
    messages,
    hasMore,
    selectedConversation,
    setConversationId,
    setFirstPage,
  } = useConversation();

  useEffect(() => {
    if (!selectedConversation?._id) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.post("/api/conversation/private", {
          userId: selectedConversation._id,
        });
        if (cancelled) return;
        const conversationId = data.conversation._id;
        setConversationId(conversationId);

        const res = await api.get(`/api/message/${conversationId}`, {
          params: { limit: PAGE_SIZE },
        });
        if (!cancelled) setFirstPage(res.data);
      } catch (error) {
        if (!cancelled) console.log("Error in getting messages", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [selectedConversation, setConversationId, setFirstPage]);

  const loadOlder = async () => {
    const { conversationId, nextCursor, prependOlder } = useConversation.getState();
    if (!conversationId || !nextCursor || loadingOlder) return;

    setLoadingOlder(true);
    try {
      const res = await api.get(`/api/message/${conversationId}`, {
        params: { limit: PAGE_SIZE, cursor: nextCursor },
      });
      if (useConversation.getState().conversationId === conversationId) {
        prependOlder(res.data);
      }
    } catch (error) {
      console.log("Error in loading older messages", error);
    } finally {
      setLoadingOlder(false);
    }
  };

  return { loading, messages, hasMore, loadingOlder, loadOlder };
};

export default useGetMessage;
