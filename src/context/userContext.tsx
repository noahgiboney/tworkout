"use client"
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from "@/user/user";

interface UserContextType {
  userId: string;
  setUserId: (userId: string) => void;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  avatarId: number | undefined;
  setAvatarId: (avatarId: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserIdState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userId") || "";
    } else {
      return "";
    }
  });
  const [user, setUser] = useState<User | null>(null);
  const [avatarId, setAvatarId] = useState<number | undefined>(undefined);

  const setUserId = (userId: string) => {
    localStorage.setItem("userId", userId);
    setUserIdState(userId);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, user, setUser, avatarId, setAvatarId }}>
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
