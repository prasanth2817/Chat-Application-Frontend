import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      if (socket) {
        socket.close();
      }

      const newSocket = io("http://localhost:8002", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      // Listen for events
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("userConnected", (userId) => {
        setOnlineUsers((prev) => [...prev, userId]);
      });

      newSocket.on("userDisconnected", (userId) => {
        setOnlineUsers((prev) => prev.filter((user) => user !== userId));
      });

      return () => {
        newSocket.off("getOnlineUsers");
        newSocket.off("userConnected");
        newSocket.off("userDisconnected");
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
