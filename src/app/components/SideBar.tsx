"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Button,
  Avatar,
  Image,
  IconButton,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { EditIcon } from "@chakra-ui/icons";

const avatars = [
  { id: 1, path: "/images/avatar-alien.png" },
  { id: 2, path: "/images/avatar-cowboy.png" },
  { id: 3, path: "/images/avatar-dolphin.png" },
  { id: 4, path: "/images/avatar-dino.png" },
];

interface User {
  avatarId?: number;
}

const SideBar = () => {
  const router = useRouter();
  const { userId } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | undefined>(
    undefined
  );
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    if (typeof window !== "undefined") {
      localStorage.clear();
    }

    window.location.href = "/login";
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const getAvatarPathById = (id: number): string | undefined => {
    const avatar = avatars.find((avatar) => avatar.id === id);
    return avatar ? avatar.path : undefined;
  };

  const handleAvatarSelection = (id: number) => {
    setSelectedAvatarId(id);
  };

  const handleCancel = () => {
    setSelectedAvatarId(user?.avatarId);
    setIsEditingAvatar(false);
  };

  const handleSubmit = async () => {
    if (userId) {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatarId: selectedAvatarId }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setIsEditingAvatar(false);
        setUser((prevUser) => ({
          ...prevUser,
          avatarId: selectedAvatarId,
        }));
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/user/${userId}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data: User = await response.json();
          setUser(data);
          setSelectedAvatarId(data.avatarId);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <Box h="100vh" bg="#5A457F" w="300px" padding="20px" marginRight="20px">
      <VStack>
        {isLoading ? (
          <CircularProgress isIndeterminate color="purple.500" />
        ) : (
          <>
            <Box
              boxSize={130}
              borderRadius="full"
              overflow="hidden"
              bg="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {selectedAvatarId !== undefined ? (
                <Image src={getAvatarPathById(selectedAvatarId)} boxSize={110} />
              ) : (
                <Avatar size="2xl" />
              )}
            </Box>
            <IconButton
              aria-label="Edit Avatar"
              icon={<EditIcon />}
              size="sm"
              mt={2}
              color="#E9E4F2"
              onClick={() => setIsEditingAvatar(!isEditingAvatar)}
            />
            {isEditingAvatar && (
              <Card mt={2} width="auto" bgColor="#C7B3DC">
                <CardHeader padding={2}></CardHeader>
                <div>
                  {avatars.map((avatar) => (
                    <Button
                      key={avatar.id}
                      bg={
                        selectedAvatarId === avatar.id ? "#600086" : "#E9E4F2"
                      }
                      _hover={{ bg: "#A759C6" }}
                      _active={{ bg: "#450061" }}
                      p="0"
                      width="50px"
                      height="50px"
                      onClick={() => handleAvatarSelection(avatar.id)}
                    >
                      <Image src={avatar.path} boxSize="45px" />
                    </Button>
                  ))}
                </div>
                <CardBody
                  padding={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Button colorScheme="blue" onClick={handleSubmit}>
                    Save
                  </Button>
                  <Button colorScheme="red" onClick={handleCancel}>
                    Cancel
                  </Button>
                </CardBody>
              </Card>
            )}
          </>
        )}
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={() => handleNavigation("/homepage")}
        >
          Today&apos;s View
        </Button>
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={() => handleNavigation("/calendar")}
        >
          Calendar
        </Button>
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={() => handleNavigation("/progress")}
        >
          Track Progress
        </Button>
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={() => handleNavigation("/profile")}
        >
          My Profile
        </Button>
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default SideBar;
