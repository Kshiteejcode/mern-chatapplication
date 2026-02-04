import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("chat-user")) || null;
    } catch (error) {
      console.error("Failed to parse auth user from localStorage", error);
      return null;
    }
  });

  
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
    }
  }, [authUser]);

  const logout = () => setAuthUser(null);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
