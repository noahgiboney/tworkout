"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { User } from "@/user/user";

interface UserContextType {
  userId: string;
  setUserId: (userId: string) => void;
  user: User | null;
  setUser: (user: User) => void;
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
  const [user, setUserState] = useState<User | null>(null);
  const [avatarId, setAvatarIdState] = useState<number | undefined>(undefined);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserIdState(storedUserId);
    }
  }, []);

  const setUserId = (userId: string) => {
    localStorage.setItem("userId", userId);
    setUserIdState(userId);
  };

  const setUser = (user: User) => {
    setUserState(user);
    setAvatarIdState(user.avatarId);
  };

  const setAvatarId = (avatarId: number) => {
    setAvatarIdState(avatarId);
  };

  return (
    <UserContext.Provider
      value={{ userId, setUserId, user, setUser, avatarId, setAvatarId }}
    >
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
