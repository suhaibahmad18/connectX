import React, { createContext, useContext, useState } from "react";
export const AuthContext = createContext();

// Only the public user profile lives in localStorage; the JWT stays in an httpOnly cookie JS can't read.
const readStoredUser = () => {
  try {
    const stored = localStorage.getItem("ChatApp");
    return stored ? JSON.parse(stored) : undefined;
  } catch {
    return undefined;
  }
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(readStoredUser);
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
