"use client";
import styles from "./page.module.css";
import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  // Function that redirects the user to the "about" page
  const handleRedirect = (newUser: boolean) => {
    if (newUser)
      router.push("/signup"); // Navigate to the /about page
    else router.push("/login");
  };

  return (
    <div className={styles.main}>
      <Text
        fontWeight="bold"
        color="white"
        textAlign="center"
        fontSize={60}
        letterSpacing={2}
        marginBottom={5}
      >
        TWORKOUT
      </Text>

      <Image
        src="/images/landing-page.png"
        alt="man and woman working out"
        width={800}
        height={800}
      />
      <Text margin={5} color="white" textAlign="center" fontSize={30}>
        Start your fitness journey today. Track, plan, and <br></br>visualize
        your progress all in one place.
      </Text>
      <Button
        borderRadius={10}
        padding={7}
        fontSize={20}
        width="140px"
        margin={3}
        onClick={() => handleRedirect(false)}
      >
        Login
      </Button>
      <Button
        fontSize={20}
        borderRadius={10}
        padding={7}
        width="140px"
        onClick={() => handleRedirect(true)}
      >
        Sign up
      </Button>
    </div>
  );
}
