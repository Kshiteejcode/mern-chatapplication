import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Play notification only if message is from the selected conversation
      if (newMessage.senderId === selectedConversation?._id) {
        newMessage.shouldShake = true;

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        const sound = new Audio(notificationSound);
        sound.play().catch((err) => console.log("Sound play failed:", err));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage); // cleanup only this listener
    };
  }, [socket, setMessages, selectedConversation]);
};

export default useListenMessages;
