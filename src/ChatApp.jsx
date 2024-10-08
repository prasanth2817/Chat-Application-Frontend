// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:8002");

// function ChatApp() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [person, setPerson] = useState("person 1");

//   useEffect(() => {
//     socket.emit("joinPerson", person);

//     socket.on("receiveMessage", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     socket.on("notifyTyping", (message) => {
//       console.log(message);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [person]);

//   const sendMessage = () => {
//     socket.emit("sendMessage", { person, text: message });
//     setMessage("");
//   };

//   const handleTyping = () => {
//     socket.emit('typing', person);
//   };

//   return (
//     <div>
//       <h1>ChatApp</h1>
//       <div>
//         <select value={person} onChange={(e) => setPerson(e.target.value)}>
//           <option value="person 1">Person 1</option>
//           <option value="person 2">Person 2</option>
//           <option value="person 3">Person 3</option>
//           <option value="person 4">Person 4</option>
//         </select>
//       </div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>{msg.text}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyPress={handleTyping}
//       />
//       <button onClick={sendMessage}>Send Message</button>
//     </div>
//   );
// }

// export default ChatApp;

// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// // Connect to the backend WebSocket server
// const socket = io("http://localhost:8002");

// function ChatApp() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [person, setPerson] = useState("person 1");
//   const [typingStatus, setTypingStatus] = useState("");
  
//   // Join a chat room and set up listeners for incoming messages and typing notifications
//   useEffect(() => {
//     // Join the room for the selected person
//     socket.emit("joinPerson", person);
    
//     // Listen for new messages
//     socket.on("receiveMessage", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Listen for typing notifications
//     socket.on("notifyTyping", (typingPerson) => {
//       setTypingStatus(`${typingPerson} is typing...`);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("notifyTyping");
//     };
//   }, [person]);

//   // Send a new message to the server
//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", { person, text: message });
//       setMessage(""); // Clear the input after sending
//     }
//   };

//   // Notify the server that the user is typing
//   const handleTyping = () => {
//     socket.emit("typing", person);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Chat Application</h1>
//       <div>
//         {/* Dropdown to select the person */}
//         <select value={person} onChange={(e) => setPerson(e.target.value)}>
//           <option value="person 1">Person 1</option>
//           <option value="person 2">Person 2</option>
//           <option value="person 3">Person 3</option>
//           <option value="person 4">Person 4</option>
//         </select>
//       </div>

//       <div style={{ margin: '10px 0', border: '1px solid gray', height: '200px', overflowY: 'scroll' }}>
//         {/* Render the list of messages */}
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.person}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Display typing indicator */}
//       {typingStatus && <p style={{ fontStyle: 'italic', color: 'gray' }}>{typingStatus}</p>}

//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyPress={handleTyping}
//         placeholder="Type your message"
//         style={{ marginRight: '10px' }}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default ChatApp;

import { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to the WebSocket server
const socket = io("http://localhost:8002");

function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [user, setUser] = useState("");        // The current user
  const [recipient, setRecipient] = useState("");  // The recipient of the messages

  // Join a room for one-to-one chat
  useEffect(() => {
    if (user && recipient) {
      socket.emit("joinRoom", { sender: user, receiver: recipient });

      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("notifyTyping", (typingMessage) => {
        setTypingStatus(typingMessage);
      });

      return () => {
        socket.off("receiveMessage");
        socket.off("notifyTyping");
      };
    }
  }, [user, recipient]);

  // Send message to the server
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { sender: user, receiver: recipient, text: message });
      setMessage("");  // Clear input field after sending
    }
  };

  // Notify the server that the user is typing
  const handleTyping = () => {
    socket.emit("typing", { sender: user, receiver: recipient });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>One-to-One Chat Application</h1>

      {/* User Input */}
      <div>
        <input
          type="text"
          placeholder="Your username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Recipient username"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      {/* Chat Window */}
      <div style={{ margin: '10px 0', border: '1px solid gray', height: '200px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Typing Notification */}
      {typingStatus && <p style={{ fontStyle: 'italic', color: 'gray' }}>{typingStatus}</p>}

      {/* Message Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleTyping}
        placeholder="Type your message"
        style={{ marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatApp;

