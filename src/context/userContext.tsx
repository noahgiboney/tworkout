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
  avatarId: number | undefined;
  setUserId: (userId: string) => void;
  setAvatarId: (avatarId: number | undefined) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserIdState] = useState<string>("");
  const [avatarId, setAvatarIdState] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserIdState(storedUserId);
      }

      const storedAvatarId = localStorage.getItem("avatarId");
      if (storedAvatarId) {
        setAvatarIdState(parseInt(storedAvatarId, 10));
      }
    }
  }, []);

  const setUserId = (userId: string) => {
    localStorage.setItem("userId", userId);
    setUserIdState(userId);
  };

  const setAvatarId = (avatarId: number | undefined) => {
    if (avatarId === undefined) {
      localStorage.removeItem("avatarId");
    } else {
      localStorage.setItem("avatarId", avatarId.toString());
    }
    setAvatarIdState(avatarId);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, avatarId, setAvatarId }}>
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
