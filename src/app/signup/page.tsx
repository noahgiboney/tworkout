"use client";
import React, { FormEvent, useState } from "react";
import styles from "./signup.module.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import SignInButton from "../components/SignInButton";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log("Signup successful");
      } else {
        console.error("Signup failed:", await response.text());
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className={styles.main}>
      <Card bgColor="#E9E4F2" display="flex" flexDirection="row">
        <div className={styles.signupContainer}>
          <CardHeader>
            <Text fontSize={40} fontWeight="extrabold">
              WELCOME
            </Text>
            <Text color="#636364">
              Welcome! Please enter your details.
            </Text>
          </CardHeader>
          <CardBody>
            <VStack as="form" onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel fontSize={18} fontWeight="bold" marginBottom={1}>
                  Email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  bgColor="rgba(251, 251, 251, .5)"
                  borderColor="black"
                  marginBottom={5}
                  fontSize={15}
                  padding={25}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" marginBottom={1} fontSize={18}>
                  Password
                </FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  bgColor="rgba(251, 251, 251, .5)"
                  borderColor="black"
                  marginBottom={5}
                  fontSize={15}
                  padding={25}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                fontSize={18}
                marginTop={6}
                padding="25px"
                paddingLeft="86px"
                paddingRight="86px"
              >
                Sign Up
              </Button>
              <SignInButton />
            </VStack>
          </CardBody>
        </div>
        <Image
          className={styles.signupImage}
          src="/images/login-art.png"
          alt="man running"
          width={600}
          height={300}
        />
      </Card>
    </div>
  );
};
 
export default Signup;
