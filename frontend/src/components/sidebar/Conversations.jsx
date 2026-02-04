import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col flex-1 gap-1 overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          isLast={idx === conversations.length - 1}
        />
      ))}

      {loading && conversations.length === 0 && (
        <span className="loading loading-spinner mx-auto my-4"></span>
      )}
    </div>
  );
};

export default Conversations;
