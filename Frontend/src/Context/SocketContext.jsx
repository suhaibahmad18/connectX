import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
const socketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

// Unset VITE_SOCKET_URL = same origin (the Vite dev proxy forwards /socket.io to the backend).
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (!authUser) return;

    // Identity comes from the httpOnly JWT cookie sent with the handshake, never from client data.
    const options = { withCredentials: true };
    const newSocket = SOCKET_URL ? io(SOCKET_URL, options) : io(options);
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });
    newSocket.on("connect_error", (error) => {
      console.log("Socket connection error:", error.message);
    });
    return () => {
      newSocket.close();
      setSocket(null);
      setOnlineUsers([]);
    };
  }, [authUser]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
