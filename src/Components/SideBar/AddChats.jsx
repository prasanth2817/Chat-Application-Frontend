import { useState } from "react";
import toast from "react-hot-toast";
import { IoPersonAddSharp } from "react-icons/io5";
import useGetConversations from "../../Hooks/useGetConversations";

const AddChat = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { getConversations } = useGetConversations();

  const handleAddChat = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/check-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const userId = data._id;

      console.log(userId);
      if (!userId) {
        throw new Error("User ID not found");
      }

      // Fetch messages to trigger the creation of a new conversation
      const messagesRes = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/create-chat/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("chat-user")}`,
          },
        }
      );

      if (!messagesRes.ok) {
        throw new Error("Error fetching messages");
      }
      // After successfully adding a chat, trigger refetching of conversations
      await getConversations();
      toast.success("Chat added successfully!");
      setTimeout(() => {
        toast.success(
          "please press the refresh button to see the updated chats list!"
        );
      }, 3000);
      setEmail("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 sm:max-w-md w-full p-4">
      {/* Input field for email */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        placeholder="Enter email to chat"
        className="input input-bordered focus:ring-2 focus:ring-blue-400 border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
      />

      {/* Add Chat Button */}
      <button
        onClick={handleAddChat}
        disabled={loading}
        className="bg-black-50 hover:bg-blue-600 p-1 rounded-lg disabled:bg-gray-400 transition-colors"
      >
        {loading ? (
          "Adding..."
        ) : (
          <IoPersonAddSharp className="w-6 h-6 sm:w-7 sm:h-7 text-white cursor-pointer" />
        )}
      </button>
    </div>
  );
};

export default AddChat;
