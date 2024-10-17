import { useState } from "react";
import useConversation from "../../Zustand/useConversation";
import useGetConversations from "../../Hooks/useGetConversations";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import LogoutButton from "./LogoutButton";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mx-auto">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full w-full sm:w-auto sm:max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-5 h-5 sm:w-6 sm:h-6 outline-none" />
      </button>
      <LogoutButton />
    </form>
  );
};

export default SearchInput;
