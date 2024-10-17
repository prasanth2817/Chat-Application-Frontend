import useGetConversations from "../../Hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./AllChats";
import useConversation from "../../Zustand/useConversation";

const Conversations = ({ toggleChat }) => {
  const { loading, conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();

  // Ensure conversations is always an array
  const conversationList = Array.isArray(conversations) ? conversations : [];

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation); // Set selected conversation in Zustand store
    toggleChat(); // Show the chat container on mobile
  };

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* If conversations are available, map through them */}
      {conversationList.length > 0
        ? conversationList.map((conversation, idx) => (
            <div
              key={conversation._id}
              onClick={() => handleConversationClick(conversation)}
              className="cursor-pointer p-2 rounded-lg"
            >
              <Conversation
                conversation={conversation}
                emoji={getRandomEmoji()}
                lastIdx={idx === conversationList.length - 1}
              />
            </div>
          ))
        : // Show a message if no conversations are found
          !loading && (
            <p className="text-center text-2xl text-gray-500">No conversations found</p>
          )}

      {/* Show loading spinner when loading */}
      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default Conversations;
