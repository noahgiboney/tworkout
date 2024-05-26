"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import SideBar from "../components/SideBar";
import styles from "./profile.module.css";
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Avatar,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useUser } from "@/context/userContext";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  weight?: number;
  heightFeet?: number;
  heightInches?: number;
  age?: number;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [heightFeet, setHeightFeet] = useState<number | undefined>(undefined);
  const [heightInches, setHeightInches] = useState<number | undefined>(
    undefined
  );
  const [age, setAge] = useState<number | undefined>(undefined);
  const [isEditingField, setIsEditingField] = useState<string | null>(null);
  const currentUser = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const response = await fetch(`/api/user/${currentUser.userId}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data: User = await response.json();
          setUser(data);
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setWeight(data.weight);
          setHeightFeet(data.heightFeet);
          setHeightInches(data.heightInches);
          setAge(data.age);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(e.target.value));
    setIsEditingField("weight");
  };

  const handleHeightFeetChange = (value: string) => {
    setHeightFeet(parseInt(value, 10));
    setIsEditingField("height");
  };

  const handleHeightInchesChange = (value: string) => {
    setHeightInches(parseInt(value, 10));
    setIsEditingField("height");
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(parseFloat(e.target.value));
    setIsEditingField("age");
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setIsEditingField("firstName");
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setIsEditingField("lastName");
  };

  const handleCancel = (field: string) => {
    if (user) {
      switch (field) {
        case "firstName":
          setFirstName(user.firstName || "");
          setIsEditingField(null);
          break;
        case "lastName":
          setLastName(user.lastName || "");
          setIsEditingField(null);
          break;
        case "weight":
          setWeight(user.weight);
          setIsEditingField(null);
          break;
        case "height":
          setHeightFeet(user.heightFeet);
          setHeightInches(user.heightInches);
          setIsEditingField(null);
          break;
        case "age":
          setAge(user.age);
          setIsEditingField(null);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async () => {
    if (currentUser && isEditingField) {
      try {
        const updates: Partial<User> = {};
        switch (isEditingField) {
          case "firstName":
            updates.firstName = firstName;
            break;
          case "lastName":
            updates.lastName = lastName;
            break;
          case "weight":
            updates.weight = weight;
            break;
          case "height":
            updates.heightFeet = heightFeet;
            updates.heightInches = heightInches;
            break;
          case "age":
            updates.age = age;
            break;
          default:
            break;
        }

        const response = await fetch(`/api/user/${currentUser.userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          ...data,
        }));
        setIsEditingField(null);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

  return (
    <div className={styles.main}>
      <div>
        <SideBar />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>My Profile</div>
        <div className={styles.avatar}>
          <Avatar size="2xl" />
        </div>
        <div className={styles.cards}>
          <Card marginTop="1rem" marginBottom="1rem" bgColor="#E9E4F2">
            <CardHeader paddingBottom="0rem">
              <Text fontSize={24} color="black">
                Personal Information
              </Text>
            </CardHeader>
            <CardBody>
              <Text paddingTop="1rem" fontSize={18} color="black">
                Email
              </Text>
              <Card bgColor="#C7B3DC">
                <CardHeader>
                  <Text fontSize={18} color="black">
                    {user?.email || "Error displaying your email"}
                  </Text>
                </CardHeader>
              </Card>
              <div className={styles.nameCards}>
                <div className={styles.firstName}>
                  <Text fontSize={18} color="black">
                    First Name
                    <IconButton
                      aria-label="Edit first name"
                      icon={<EditIcon />}
                      size="sm"
                      ml={2}
                      bg="#E9E4F2"
                      color="#130030"
                      onClick={() => setIsEditingField("firstName")}
                    />
                  </Text>
                  {isEditingField === "firstName" ? (
                    <Card bgColor="#C7B3DC">
                      <CardHeader>
                        <Input
                          type="text"
                          value={firstName}
                          onChange={handleFirstNameChange}
                          placeholder="Enter your first name"
                        />
                        <Button
                          colorScheme="blue"
                          mt={2}
                          onClick={handleSubmit}
                        >
                          Save
                        </Button>
                        <Button
                          colorScheme="red"
                          mt={2}
                          onClick={() => handleCancel("firstName")}
                          marginLeft="5"
                        >
                          Cancel
                        </Button>
                      </CardHeader>
                    </Card>
                  ) : (
                    <Card bgColor="#C7B3DC">
                      <CardHeader>
                        <Text fontSize={18} color="black">
                          {firstName || "Update your first name"}
                        </Text>
                      </CardHeader>
                    </Card>
                  )}
                </div>
                <div className={styles.lastName}>
                  <Text fontSize={18} color="black">
                    Last Name
                    <IconButton
                      aria-label="Edit last name"
                      icon={<EditIcon />}
                      size="sm"
                      ml={2}
                      bg="#E9E4F2"
                      color="#130030"
                      onClick={() => setIsEditingField("lastName")}
                    />
                  </Text>
                  {isEditingField === "lastName" ? (
                    <Card bgColor="#C7B3DC">
                      <CardHeader>
                        <Input
                          type="text"
                          value={lastName}
                          onChange={handleLastNameChange}
                          placeholder="Enter your last name"
                        />
                        <Button
                          colorScheme="blue"
                          mt={2}
                          onClick={handleSubmit}
                        >
                          Save
                        </Button>
                        <Button
                          colorScheme="red"
                          mt={2}
                          onClick={() => handleCancel("lastName")}
                          marginLeft="5"
                        >
                          Cancel
                        </Button>
                      </CardHeader>
                    </Card>
                  ) : (
                    <Card bgColor="#C7B3DC">
                      <CardHeader>
                        <Text fontSize={18} color="black">
                          {lastName || "Update your last name"}
                        </Text>
                      </CardHeader>
                    </Card>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
          <Card marginTop="1rem" marginBottom="1rem" bgColor="#E9E4F2">
            <CardHeader paddingBottom="0rem">
              <Text fontSize={24} color="black">
                Physical Information
              </Text>
            </CardHeader>
            <CardBody>
              <Text paddingTop="1rem" fontSize={18} color="black">
                Weight
                <IconButton
                  aria-label="Edit weight"
                  icon={<EditIcon />}
                  size="sm"
                  ml={2}
                  bg="#E9E4F2"
                  color="#130030"
                  onClick={() => setIsEditingField("weight")}
                />
              </Text>
              {isEditingField === "weight" ? (
                <Card bgColor="#C7B3DC">
                  <CardHeader>
                    <Input
                      type="number"
                      value={weight !== undefined ? weight.toString() : ""}
                      onChange={handleWeightChange}
                      placeholder="Enter your weight"
                    />
                    <Button colorScheme="blue" mt={2} onClick={handleSubmit}>
                      Save
                    </Button>
                    <Button
                      colorScheme="red"
                      mt={2}
                      onClick={() => handleCancel("weight")}
                      marginLeft="5"
                    >
                      Cancel
                    </Button>
                  </CardHeader>
                </Card>
              ) : (
                <Card bgColor="#C7B3DC">
                  <CardHeader>
                    <Text fontSize={18} color="black">
                      {weight !== undefined
                        ? `${weight} lbs`
                        : "Update your weight"}
                    </Text>
                  </CardHeader>
                </Card>
              )}
              <Text paddingTop="1rem" fontSize={18} color="black">
                Height
                <IconButton
                  aria-label="Edit height"
                  icon={<EditIcon />}
                  size="sm"
                  ml={2}
                  bg="#E9E4F2"
                  color="#130030"
                  onClick={() => setIsEditingField("height")}
                />
              </Text>
              {isEditingField === "height" ? (
                <Card bgColor="#C7B3DC">
                  <CardHeader>
                    <Text fontSize={18} color="black">
                      Feet
                    </Text>
                    <NumberInput
                      value={heightFeet}
                      onChange={handleHeightFeetChange}
                      min={0}
                      max={8}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Text fontSize={18} color="black">
                      Inches
                    </Text>
                    <NumberInput
                      value={heightInches}
                      onChange={handleHeightInchesChange}
                      min={0}
                      max={11}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button colorScheme="blue" mt={2} onClick={handleSubmit}>
                      Save
                    </Button>
                    <Button
                      colorScheme="red"
                      mt={2}
                      onClick={() => handleCancel("height")}
                      marginLeft="5"
                    >
                      Cancel
                    </Button>
                  </CardHeader>
                </Card>
              ) : (
                <Card bgColor="#C7B3DC">
                  <CardHeader>
                    <Text fontSize={18} color="black">
                      {heightFeet !== undefined && heightInches !== undefined
                        ? `${heightFeet}' ${heightInches}`
                        : "Not provided"}
                    </Text>
                  </CardHeader>
                </Card>
              )}
              <Text paddingTop="1rem" fontSize={18} color="black">
                Age
                <IconButton
                  aria-label="Edit Age"
                  icon={<EditIcon />}
                  size="sm"
                  ml={2}
                  bg="#E9E4F2"
                  color="#130030"
                  onClick={() => setIsEditingField("age")}
                />
              </Text>
              {isEditingField === "age" ? (
                <Card bgColor="#C7B3DC">
                  <CardHeader>
                    <Input
                      type="number"
                      value={age !== undefined ? age.toString() : ""}
                      onChange={handleAgeChange}
                      placeholder="Update your age"
                    />
                    <Button colorScheme="blue" mt={2} onClick={handleSubmit}>
                      Save
                    </Button>
                    <Button
                      colorScheme="red"
                      mt={2}
                      onClick={() => handleCancel("age")}
                      marginLeft="5"
                    >
                      Cancel
                    </Button>
                  </CardHeader>
                </Card>
              ) : (
                <Card bgColor="#C7B3DC">
                  <CardHeader>
                    <Text fontSize={18} color="black">
                      {age !== undefined
                        ? `${age} years old`
                        : "Update your age"}
                    </Text>
                  </CardHeader>
                </Card>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
