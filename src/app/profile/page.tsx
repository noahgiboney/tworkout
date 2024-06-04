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
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  CircularProgress,
  Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useUser } from "@/context/userContext";
import WeightLogger from "../components/WeightLogger";

interface User {
  email: string;
  name: string;
  weight?: WeightEntry[];
  heightFeet?: number;
  heightInches?: number;
  age?: number;
  avatarId?: number;
}

interface WeightEntry {
  weight: number;
  date: Date;
}

type Avatar = {
  id: number;
  path: string;
};

const avatars: Avatar[] = [
  { id: 1, path: "/images/avatar-alien.png" },
  { id: 2, path: "/images/avatar-cowboy.png" },
  { id: 3, path: "/images/avatar-dolphin.png" },
  { id: 4, path: "/images/avatar-dino.png" },
];

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [heightFeet, setHeightFeet] = useState<number | undefined>(undefined);
  const [heightInches, setHeightInches] = useState<number | undefined>(
    undefined
  );
  const [age, setAge] = useState<number | undefined>(undefined);
  const [avatarId, setAvatarId] = useState<number | undefined>(undefined);
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | undefined>(
    undefined
  );
  const getAvatarPathById = (id: number): string | undefined => {
    const avatar = avatars.find((avatar) => avatar.id === id);
    return avatar ? avatar.path : undefined;
  };

  const [isEditingField, setIsEditingField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useUser();

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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsEditingField("name");
  };

  const handleAvatarSelection = (id: number) => {
    setSelectedAvatarId(id);
    setIsEditingField("avatar");
  };

  const handleCancel = (field: string) => {
    if (user) {
      switch (field) {
        case "name":
          setName(user.name || "");
          setIsEditingField(null);
          break;
        case "weight":
          setWeight(
            user.weight ? user.weight[user.weight.length - 1].weight : undefined
          );
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
        case "avatar":
          setSelectedAvatarId(user.avatarId);
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
          case "name":
            updates.name = name;
            break;
          case "weight":
            if (weight !== undefined) {
              updates.weight = [
                ...(user?.weight || []),
                { weight, date: new Date() },
              ];
            }
            break;
          case "height":
            updates.heightFeet = heightFeet;
            updates.heightInches = heightInches;
            break;
          case "age":
            updates.age = age;
            break;
          case "avatar":
            updates.avatarId = selectedAvatarId;
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
        if (isEditingField === "avatar") {
          setAvatarId(selectedAvatarId);
        }
        setIsEditingField(null);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

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
          setName(data.name || "");
          const latestWeight = data.weight
            ? data.weight[data.weight.length - 1].weight
            : undefined;
          setWeight(latestWeight);
          setHeightFeet(data.heightFeet);
          setHeightInches(data.heightInches);
          setAge(data.age);
          setAvatarId(data.avatarId);
          setSelectedAvatarId(data.avatarId);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className={styles.main}>
      <div>
        <SideBar />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>My Profile</div>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress isIndeterminate color="purple.500" />
          </Box>
        ) : (
          <>
            <div className={styles.avatar}>
              {avatarId !== undefined ? (
                <Box
                  boxSize={130}
                  borderRadius="full"
                  overflow="hidden"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={getAvatarPathById(avatarId)} boxSize={110} />
                </Box>
              ) : (
                <Avatar size="2xl" />
              )}

              <IconButton
                aria-label="Edit Avatar"
                icon={<EditIcon />}
                size="sm"
                mt={2}
                color="#E9E4F2"
                onClick={() => setIsEditingField("avatar")}
              />
              {isEditingField === "avatar" && (
                <Card mt={2} width="auto" bgColor="#C7B3DC">
                  <CardHeader padding={2}></CardHeader>
                  <div className={styles.avatarCards}>
                    {avatars.map((avatar) => (
                      <div
                        key={avatar.id}
                        onClick={() => handleAvatarSelection(avatar.id)}
                      >
                        <Button
                          bg={
                            selectedAvatarId === avatar.id
                              ? "#600086"
                              : "#E9E4F2"
                          }
                          _hover={{ bg: "#A759C6" }}
                          _active={{ bg: "#450061" }}
                          p="0"
                          width="50px"
                          height="50px"
                        >
                          <Image src={avatar.path} boxSize="45px" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <CardBody
                    padding={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    <Button colorScheme="blue" onClick={handleSubmit}>
                      Save
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleCancel("avatar")}
                    >
                      Cancel
                    </Button>
                  </CardBody>
                </Card>
              )}
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
                  <Text paddingTop="1rem" fontSize={18} color="black">
                    Name
                    <IconButton
                      aria-label="Edit Name"
                      icon={<EditIcon />}
                      size="sm"
                      ml={2}
                      bg="#E9E4F2"
                      color="#130030"
                      onClick={() => setIsEditingField("name")}
                    />
                  </Text>
                  {isEditingField === "name" ? (
                    <Card bgColor="#C7B3DC">
                      <CardHeader>
                        <Input
                          type="text"
                          value={name}
                          onChange={handleNameChange}
                          placeholder="Update your name"
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
                          onClick={() => handleCancel("name")}
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
                          {name !== undefined ? `${name}` : "Update your name"}
                        </Text>
                      </CardHeader>
                    </Card>
                  )}
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
                          {heightFeet !== undefined &&
                          heightInches !== undefined
                            ? `${heightFeet}' ${heightInches}"`
                            : "Update your height"}
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
              <WeightLogger/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;