import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          aria-label="Type a message"
          autoFocus
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          aria-label="Send message"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 hover:text-white disabled:opacity-50"
          disabled={loading || !message.trim()}
        >
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
