import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  if (!authUser || !message) return null;

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);

  const chatAlignment = fromMe ? "chat chat-end" : "chat chat-start";

  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic || "/default-avatar.png";

  const bubbleStyle = fromMe
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-gray-900";

  const shakeAnimation = message.shouldShake
    ? "animate-[shake_0.5s_ease-in-out]"
    : "";

  return (
    <div className={`${chatAlignment} mb-2`}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full ring-2 ring-gray-300 overflow-hidden">
          <img
            src={profilePic}
            alt="User avatar"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

     
      <div
        className={`chat-bubble ${bubbleStyle} ${shakeAnimation} max-w-[75%] break-words shadow-md`}
      >
        {message.message}
      </div>

    
      <div className="chat-footer text-xs opacity-50 text-right">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
