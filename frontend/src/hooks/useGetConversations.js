import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import fetchWithRefresh from "../utils/FetchWithRefresh";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async (signal) => {
    setLoading(true);
    try {
      const res = await fetchWithRefresh("/users/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setConversations(data);
    } catch (error) {
      if (error.name !== "AbortError") toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchConversations(controller.signal);

    return () => controller.abort();
  }, []);

  return { loading, conversations, refetch: fetchConversations };
};

export default useGetConversations;
