import { useState } from "react";
import MessageContainer from "../Components/ChatRoom/ChatContainer";
import Sidebar from "../Components/SideBar/Sidebar";

const Home = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="flex flex-col md:flex-row lg:justify-center h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* Sidebar */}
      <div
        className={`w-full md:w-4/12 md:min-w-[300px] ${
          showChat ? "hidden" : "block"
        } md:block`}
      >
        <Sidebar toggleChat={toggleChat} />{" "}
        {/* Pass toggle function to sidebar */}
      </div>

      {/* MessageContainer */}
      <div className={`flex flex-1 ${showChat ? "block" : "hidden"} md:flex`}>
        <MessageContainer toggleChat={toggleChat} />{" "}
        {/* Pass toggle function to chat container */}
      </div>
    </div>
  );
};

export default Home;
