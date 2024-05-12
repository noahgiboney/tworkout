// NextAuth and Chakra UI providers
"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import customTheme from "../styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <ChakraProvider theme={customTheme}>{props.children}</ChakraProvider>
    </SessionProvider>
  );
};

export default Providers;
