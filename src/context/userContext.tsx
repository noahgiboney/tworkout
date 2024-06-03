"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  userId: string;
  setUserId: (userId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserIdState] = useState<string>(() => {
    // Load userId from localStorage if available
    if (typeof window !== "undefined") {
      return localStorage.getItem("userId") || "";
    } else {
      return "";
    }
  });

  useEffect(() => {
    // Load userId from localStorage if available
    const storedUserId = localStorage.getItem("userId");
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const setUserId = (userId: string) => {
    localStorage.clear();
    localStorage.setItem("userId", userId);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
