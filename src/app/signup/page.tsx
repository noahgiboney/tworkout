"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
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
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import SignInButton from "../components/SignInButton";
import { useUser } from "@/context/userContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupFailed, setSignupFailed] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { userId, setUserId } = useUser();

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        //console.log("mongodb id", data.userId);
        setUserId(data.userId);
        console.log("Signup successful");
        router.push("/homepage");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Signup failed");
        setSignupFailed(true);
        console.error("Signup failed:", errorData);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSignupFailed(true);
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
            <Text color="#636364">Welcome! Please enter your details.</Text>
          </CardHeader>
          <CardBody>
            <VStack as="form" onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel fontSize={18} fontWeight="bold" marginBottom={1}>
                  Name
                </FormLabel>
                <Input
                  type="name"
                  placeholder="Enter your name"
                  bgColor="rgba(251, 251, 251, .5)"
                  borderColor="black"
                  marginBottom={5}
                  fontSize={15}
                  padding={25}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
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
              {signupFailed && (
                <Text fontWeight="bold" color="red.500">
                  {error}
                </Text>
              )}
              <SignInButton />
              <Link
                margin={3}
                fontSize={14}
                textAlign={"center"}
                as={NextLink}
                color={"black"}
                fontWeight={"bold"}
                href="/login"
              >
                Already have an account? <br />
                Click here to log in.
              </Link>
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
