import AddChat from "./AddChats";
import SearchInput from "./SearchInput";
import Conversations from "./SelectedChat";

const Sidebar = ({ toggleChat }) => {
  return (
    <div className="w-full h-screen border-r border-slate-500 p-4 flex flex-col">
      {/* Add Chat and Search */}
      <SearchInput />
      <div className="divider px-5"></div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        <Conversations toggleChat={toggleChat} />{" "}
        {/* Pass toggleChat to Conversations */}
      </div>
      <AddChat />
    </div>
  );
};

export default Sidebar;
