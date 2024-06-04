"use client";
import React from "react";
import { Box, VStack, Button, Avatar, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

const SideBar = () => {
  const router = useRouter();

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

  return (
    <Box h="100vh" bg="#5A457F" w="300px" padding="20px" marginRight="20px">
      <VStack>
        <Avatar marginTop="30px" marginBottom="30px" size="2xl" />
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
