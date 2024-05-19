import React from "react";
import { Box, VStack, Button, Avatar } from "@chakra-ui/react";
import Link from "next/link";

const SideBar = () => {
  return (
    <div>
      <Box h="100vh" bg="#5A457F" w="300px">
        <VStack>
          <Avatar marginTop="30px" marginBottom="30px" size="superLg" />
          <Button
            bg="#C7B3DC"
            color="black"
            padding={30}
            width="13rem"
            margin={1}
          >
            <Link href="/homepage">Today&apos;s View</Link>
          </Button>
          <Button
            bg="#C7B3DC"
            color="black"
            padding={30}
            width="13rem"
            margin={1}
          >
            <Link href="/calendar">Calendar</Link>
          </Button>
          <Button
            bg="#C7B3DC"
            color="black"
            padding={30}
            width="13rem"
            margin={1}
          >
            <Link href="/progress">Track Progress</Link>
          </Button>
          <Button
            bg="#C7B3DC"
            color="black"
            padding={30}
            width="13rem"
            margin={1}
          >
            <Link href="/profile">My Profile</Link>
          </Button>
        </VStack>
      </Box>
    </div>
  );
};

export default SideBar;