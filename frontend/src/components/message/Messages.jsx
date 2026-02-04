import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto flex flex-col gap-2">
      {loading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length > 0 &&
        messages.map((message, idx) => (
          <div
            key={message._id}
            ref={idx === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-400 mt-4">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
