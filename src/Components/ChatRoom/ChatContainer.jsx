import { useEffect } from "react";
import useConversation from "../../Zustand/useConversation";
import MessageInput from "./ChatInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../Context/AuthContext";
import { useSocketContext } from "../../Context/SocketContext";
import { IoArrowBackOutline } from "react-icons/io5";
import contactImage from "../../assets/contact-image.jpg";

const MessageContainer = ({ toggleChat }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // Check online status
  const isOnline =
    selectedConversation?._id && onlineUsers.includes(selectedConversation._id);

  useEffect(() => {
    // Cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col w-full h-full fixed md:relative">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-gray-700 px-4 py-2 mb-2 flex items-center gap-4">
            {/* Back button for mobile screens */}
            <button
              onClick={toggleChat} // This will show the sidebar
              className="md:hidden bg-gray-600 hover:bg-gray-800 p-2 rounded-lg"
            >
              <IoArrowBackOutline className="text-white w-6 h-6" />
            </button>

            {/* User Avatar and Status */}
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img src={contactImage} alt="user avatar" />
              </div>
            </div>
            <div>
              <span className="text-slate-50 font-bold">
                {selectedConversation.fullName}
              </span>
              <span
                className={`ml-2 text-sm ${
                  isOnline ? "text-green-400" : "text-gray-400"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto h-full">
            <Messages />
          </div>
          {/* Message Input */}
          <div className="px-4 py-2">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
