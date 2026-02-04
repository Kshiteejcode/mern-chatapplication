import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import fetchWithRefresh from "../utils/FetchWithRefresh";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    if (!message?.trim()) {
      toast.error("Cannot send empty message");
      return null;
    }

    setLoading(true);

    try {
      const res = await fetchWithRefresh(`/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // Handle HTTP or API errors
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to send message");
      }

      // Use functional update to avoid stale state
      setMessages((prevMessages) => [...prevMessages, data]);

      toast.success("Message sent!");
      return data;
    } catch (error) {
      toast.error(error?.message || "Network error. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
