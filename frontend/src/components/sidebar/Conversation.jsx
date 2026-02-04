import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, isLast, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers = [] } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        role="button"
        aria-pressed={isSelected}
        onClick={() => setSelectedConversation(conversation)}
        className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer transition-colors duration-200
          ${isSelected ? "bg-sky-500" : "hover:bg-sky-500/70"}
        `}
      >
        {/* Avatar */}
        <div
          className={`avatar ${isOnline ? "online" : ""}`}
          title={isOnline ? "Online" : "Offline"}
        >
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic || "/default-avatar.png"}
              alt={`${conversation.fullName} avatar`}
            />
          </div>
        </div>

        {/* Name + Emoji */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-200 truncate">
              {conversation.fullName}
            </p>
            {emoji && <span className="text-xl">{emoji}</span>}
          </div>
        </div>
      </div>

      {!isLast && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
