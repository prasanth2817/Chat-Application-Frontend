// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import AxiosService from './Common/ApiServices';
// import {jwtDecode} from 'jwt-decode'; 

// // Connect to the WebSocket server
// const socket = io("http://localhost:8002");

// function ChatApp() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState({}); // Store messages as an object
//   const [typingStatus, setTypingStatus] = useState("");
//   const [user, setUser] = useState("");
//   const [userName, setUserName] = useState("");
//   const [recipient, setRecipient] = useState("");
//   const [selectedChat, setSelectedChat] = useState(null);

//   // Fetch userId and userName from token stored in sessionStorage
//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken._id;
//         const fullName = `${decodedToken.firstName} ${decodedToken.lastName}`;
//         if (userId) {
//           setUser(userId);
//           setUserName(fullName);
//         } else {
//           console.error("Token does not contain a valid _id");
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     } else {
//       console.error("No token found in session storage.");
//     }
//   }, []);

//   // Fetch chats for the user (with user details already populated in the response)
//   useEffect(() => {
//     const fetchChats = async () => {
//       if (user) {
//         try {
//           const res = await AxiosService.get(`/messages/chats/${user}`);
//           console.log("Fetched messages:", res.data); // Check the structure
//           const fetchedChats = res.data || {};
//           setMessages(fetchedChats);
//         } catch (error) {
//           console.error("Error fetching chats:", error);
//         }
//       }
//     };
//     fetchChats();
//   }, [user]);
  

//   // Join a room for one-to-one chat and handle incoming messages
//   useEffect(() => {
//     if (user && recipient) {
//       socket.emit("joinRoom", { sender: user, receiver: recipient });

//       socket.on("receiveMessage", (message) => {
//         setMessages((prevMessages) => ({
//           ...prevMessages,
//           [recipient]: [...(prevMessages[recipient] || []), message],
//         }));
//       });

//       socket.on("notifyTyping", (typingMessage) => {
//         if (typingMessage.sender !== user) {
//           setTypingStatus(`${typingMessage.senderName} is typing...`);
//         }
//       });

//       return () => {
//         socket.off("receiveMessage");
//         socket.off("notifyTyping");
//       };
//     }
//   }, [user, recipient]);

//   // Send message to the server
//   const sendMessage = async () => {
//     if (message.trim() && recipient !== user) {
//       const msgObject = { sender: user, recipient, content: message, timestamp: new Date().toISOString() };
      
//       // Immediately update local messages before sending to server
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [recipient]: [...(prevMessages[recipient] || []), msgObject],
//       }));

//       socket.emit("sendMessage", msgObject);

//       try {
//         const res = await AxiosService.post("/messages/send", msgObject);
//         if (res.status !== 201) {
//           console.error("Failed to save message on server");
//         }
//       } catch (error) {
//         console.error("Failed to send message:", error);
//       }

//       setMessage(""); // Clear input field
//     }
//   };

//   // Notify the server that the user is typing
//   const handleTyping = () => {
//     if (recipient && recipient !== user) {
//       socket.emit("typing", { sender: user, senderName: userName, receiver: recipient });
//       setTypingStatus(`${userName} is typing...`);
//       setTimeout(() => setTypingStatus(""), 3000);
//     }
//   };

//   return (
//     <div className="chat-app">
//       <div className="sidebar">
//         <h2>Chats</h2>
//         <div className="contact-list">
//           <div style={{ width: "30%", borderRight: "1px solid gray", overflowY: "auto" }}>
//             {Object.keys(messages).length > 0 ? (
//               Object.keys(messages).map((otherUserId) => (
//                 otherUserId !== user && ( // Exclude self from chat list
//                   <div
//                     key={otherUserId}
//                     onClick={() => {
//                       setSelectedChat(otherUserId);
//                       setRecipient(otherUserId);
//                       setTypingStatus(""); // Reset typing status when changing chat
//                     }}
//                     style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid gray" }}
//                   >
//                     {messages[otherUserId]?.[0]?.sender?._id === otherUserId
//                       ? `${messages[otherUserId][0]?.sender?.firstName || 'Unknown'} ${messages[otherUserId][0]?.sender?.lastName || ''}`
//                       : `${messages[otherUserId][0]?.recipient?.firstName || 'Unknown'} ${messages[otherUserId][0]?.recipient?.lastName || ''}`}
//                   </div>
//                 )
//               ))
//             ) : (
//               <p>No chats available</p>
//             )}
//           </div>

//           <div style={{ width: "70%", padding: "20px", overflowY: "auto" }}>
//           {selectedChat && Array.isArray(messages[selectedChat]) && messages[selectedChat].length > 0 ? (
//   messages[selectedChat].map((msg, index) => (
//     <div key={index} className={msg.sender._id === user ? "my-message" : "received-message"}>
//       <strong>
//         {msg.sender && msg.sender._id === user 
//           ? "You" 
//           : `${msg.sender?.firstName || 'Unknown'} ${msg.sender?.lastName || ''}`}:
//       </strong>
//       <span>{msg.content}</span>
//       <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
//     </div>
//   ))
// ) : (
//   <p>No messages in this chat</p>
// )}

//           </div>
//         </div>
//       </div>
//       <div className="chat-area">
//         <div className="chat-header">
//           <h3>
//             {selectedChat && messages[selectedChat]?.[0]?.recipient?._id === recipient
//               ? `${messages[selectedChat][0]?.recipient?.firstName || 'Unknown'} ${messages[selectedChat][0]?.recipient?.lastName || ''}`
//               : "Select a contact"}
//           </h3>
//         </div>
//         <div className="chat-window">
//           {Array.isArray(messages[recipient]) && messages[recipient]?.length > 0 ? (
//             messages[recipient].map((msg, index) => (
//               <div key={index} className={msg.sender?._id === user ? "my-message" : "received-message"}>
//                 <strong>
//                   {msg.sender?._id === user 
//                     ? "You" 
//                     : `${msg.sender?.firstName || 'Unknown'} ${msg.sender?.lastName || ''}`}:
//                 </strong>
//                 <span>{msg.content}</span>
//                 <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
//               </div>
//             ))
//           ) : (
//             <p>No messages yet</p>
//           )}
//         </div>

//         {typingStatus && <p className="typing-notification">{typingStatus}</p>}
//         <div className="message-input">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 sendMessage();
//               } else {
//                 handleTyping();
//               }
//             }} 
//             placeholder="Type a message..."
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;