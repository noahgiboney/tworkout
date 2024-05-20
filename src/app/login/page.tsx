"use client";
import React, { FormEvent, useState } from "react";
import styles from "./login.module.css";
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
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import SignInButton from "../components/SignInButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log("Login successful");
        // Handle successful login, e.g., redirect to another page
      } else {
        console.error("Login failed:", await response.json());
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.main}>
      <Card bgColor="#E9E4F2" display="flex" flexDirection="row">
        <div className={styles.loginContainer}>
          <CardHeader>
            <Text fontSize={40} fontWeight="extrabold">
              WELCOME BACK
            </Text>
            <Text color="#636364">
              Welcome back! Please enter your details.
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
                Sign in
              </Button>
              <SignInButton />
              <Link
                margin={3}
                fontSize={14}
                textAlign={"center"}
                as={NextLink}
                color={"black"}
                fontWeight={"bold"}
                href="/signup"
              >
                Don&apos;t have an account? <br />
                Click here to sign up.
              </Link>
            </VStack>
          </CardBody>
        </div>
        <Image
          className={styles.loginImage}
          src="/images/login-art.png"
          alt="man running"
          width={600}
          height={300}
        />
      </Card>
    </div>
  );
};

export default Login;
