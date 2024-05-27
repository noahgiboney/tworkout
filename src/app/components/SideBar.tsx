import React from "react";
import { Box, VStack, Button, Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface SideBarProps {
  userId: string;
}



const SideBar = () => {
  return (
    <Box h="100vh" bg="#5A457F" w="300px" padding="20px" marginRight="20px">
      <VStack>
        <Avatar marginTop="30px" marginBottom="30px" size="2xl" />
        <Link href="/homepage" passHref>
          <Button
            as="a"
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
            as="a"
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
            as="a"
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
            as="a"
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
