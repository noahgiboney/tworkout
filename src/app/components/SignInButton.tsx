import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";

const SignInButton = () => {
  return (
    <Button
      padding={25}
      bg={"#ECE8F1"}
      color={"black"}
      fontSize={18}
      border="1px"
      borderColor={"#600086"}
      onClick={() =>
        signIn("google", { callbackUrl: "http://localhost:3000/homepage" })
      }
    >
      <Image
        src="/images/google-logo.webp"
        alt="google logo"
        width={20}
        height={20}
      />
      Sign in with Google
    </Button>
  );
};

export default SignInButton;
