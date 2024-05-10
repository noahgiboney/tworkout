"use client";

import React, { FormEvent } from "react";
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
} from "@chakra-ui/react";
import Image from "next/image";

const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
  e.preventDefault();
  console.log("submitted");
};

const Login = () => {
  return (
    <div className={styles.main}>
      <div>
        <Card padding={0} bgColor="#E9E4F2" display="flex" flexDirection="row">
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
                  <FormLabel fontWeight="bold" marginBottom={1}>
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    bgColor="rgba(251, 251, 251, .5)"
                    borderColor="black"
                    marginBottom={5}
                    fontSize={14}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="bold" marginBottom={1}>
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    bgColor="rgba(251, 251, 251, .5)"
                    borderColor="black"
                    marginBottom={5}
                    fontSize={14}
                  />
                </FormControl>
                <Button type="submit" paddingLeft="60px" paddingRight="60px">
                  Sign in
                </Button>
              </VStack>
            </CardBody>
          </div>
          <Image
            className={styles.loginImage}
            src="/images/login-art.png"
            alt="man running"
            width={400}
            height={300}
          />
        </Card>
      </div>
    </div>
  );
};

export default Login;
