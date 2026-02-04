import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    let newSocket;
    if (authUser) {
      newSocket = io("https://chat-app-1-ioju.onrender.com", {
        query: { userId: authUser._id },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => setOnlineUsers(users));

      newSocket.on("connect_error", (err) => console.error("Socket connect error:", err));
      newSocket.on("disconnect", () => console.log("Socket disconnected"));
    }

    return () => {
      if (newSocket) newSocket.disconnect();
      setSocket(null);
      setOnlineUsers([]);
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
