// In-memory, single-instance presence. Phase 2 replaces this module with a Redis-backed one
// exposing the same functions, so callers don't change.
const connectionCounts = new Map();

// Returns true when the user just came online (first open connection).
export const addConnection = (userId) => {
  const count = (connectionCounts.get(userId) ?? 0) + 1;
  connectionCounts.set(userId, count);
  return count === 1;
};

// Returns true when the user just went offline (last connection closed).
export const removeConnection = (userId) => {
  const count = (connectionCounts.get(userId) ?? 0) - 1;
  if (count <= 0) {
    connectionCounts.delete(userId);
    return true;
  }
  connectionCounts.set(userId, count);
  return false;
};

export const getOnlineUserIds = () => [...connectionCounts.keys()];
