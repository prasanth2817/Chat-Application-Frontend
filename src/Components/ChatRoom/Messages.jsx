import { useEffect, useRef } from "react";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "../Skeleton/messageSkeleton";
import Message from "./Message";
import useListenMessages from "../../Hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 h-full">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-600 font-medium text-2xl mt-20">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
