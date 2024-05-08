import styles from "./page.module.css";
import { Box, Button, Text, Heading } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.main}>
      <Text
        fontWeight="bold"
        color="white"
        textAlign="center"
        fontSize={45}
        letterSpacing={2}
        marginBottom={5}
      >
        TWORKOUT
      </Text>

      <Image
        src="/images/landing-page.webp"
        alt="man and woman working out"
        width={700}
        height={750}
      />
      <Text margin={5} color="white" textAlign="center">
        Start your fitness journey today. Track, plan, and <br></br>visualize
        your progress all in one place.
      </Text>
      <Button borderRadius={10} padding={7} width="130px" margin={3} >
        Login
      </Button>
      <Button borderRadius={10} padding={7} width="130px">
        Sign up
      </Button>
    </div>
  );
}
