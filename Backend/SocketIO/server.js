import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { env } from "../config/env.js";
import { AUTH_COOKIE_NAME, getUserFromToken } from "../middleware/secureRoute.js";
import { addConnection, getOnlineUserIds, removeConnection } from "./presence.js";

let io = null;

// Every socket joins its user's room; emitting to rooms (not raw socket ids) is what lets
// the Phase 2 Redis adapter fan events out across instances without changing callers.
const userRoom = (userId) => `user:${userId}`;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: env.clientOrigins,
      credentials: true,
    },
  });

  // Parses the httpOnly auth cookie on the handshake request.
  io.engine.use(cookieParser());

  io.use(async (socket, next) => {
    try {
      const user = await getUserFromToken(socket.request.cookies?.[AUTH_COOKIE_NAME]);
      if (!user) return next(new Error("Unauthorized"));
      socket.data.userId = String(user._id);
      next();
    } catch (error) {
      console.error("Socket authentication error:", error.message);
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const { userId } = socket.data;
    socket.join(userRoom(userId));

    if (addConnection(userId)) {
      io.emit("getOnlineUsers", getOnlineUserIds());
    } else {
      socket.emit("getOnlineUsers", getOnlineUserIds());
    }

    socket.on("disconnect", () => {
      if (removeConnection(userId)) {
        io.emit("getOnlineUsers", getOnlineUserIds());
      }
    });
  });

  return io;
};

export const emitToUsers = (userIds, event, payload) => {
  if (!io || userIds.length === 0) return;
  io.to(userIds.map((id) => userRoom(String(id)))).emit(event, payload);
};
