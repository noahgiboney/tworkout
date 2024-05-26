import { Button } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/userContext";

const SignInButton = () => {
  const { data: session } = useSession();
  const { setUserId } = useUser();

  useEffect(() => {
    if (session && session.id) {
      setUserId(session.id);
    }
  }, [session, setUserId]);

  const handleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: "http://localhost:3000/homepage",
    });
    if (result?.error) {
      console.error("Sign in error: ", result.error);
    } else if (result?.ok) {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      console.log(data.userId);
      setUserId(data.userId);
    }
  };
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
