import React, { useEffect, useState } from "react";
import { Box, VStack, Button, Image, Avatar, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { getAvatarPathById } from "@/avatars/avatarsList";

const SideBar = () => {
  const { userId, user, setUser, avatarId, setAvatarId } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && !user) {
        try {
          const response = await fetch(`/api/user/${userId}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setUser(data);
          setAvatarId(data.avatarId);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, user, setUser, setAvatarId]);

  if (loading) {
    return (
      <Box h="100vh" bg="#5A457F" w="300px" padding="20px" marginRight="20px" display="flex" alignItems="center" justifyContent="center">
        <Spinner color="white" />
      </Box>
    );
  }

  return (
    <Box h="100vh" bg="#5A457F" w="300px" padding="20px" marginRight="20px">
      <VStack>
        <Box
          boxSize={130}
          borderRadius="full"
          overflow="hidden"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {avatarId !== undefined ? (
            <Image src={getAvatarPathById(avatarId)} boxSize={110} />
          ) : (
            <Avatar size="2xl" />
          )}
        </Box>
        <Link href="/homepage" passHref>
          <Button
            bg="#C7B3DC"
            color="black"
            padding={30}
            width="13rem"
            margin={1}
          >
            Today&apos;s View
          </Button>
        </Link>
        <Link href="/calendar" passHref>
          <Button
            bg="#C7B3DC"
            color="black"
            padding={30}
            width="13rem"
            margin={1}
          >
            Calendar
          </Button>
        </Link>
        <Link href="/progress" passHref>
          <Button
            bg="#C7B3DC"
            color="black"
            padding={30}
            width="13rem"
            margin={1}
          >
            Track Progress
          </Button>
        </Link>
        <Link href="/profile" passHref>
          <Button
            bg="#C7B3DC"
            color="black"
            padding={30}
            width="13rem"
            margin={1}
          >
            My Profile
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default SideBar;
