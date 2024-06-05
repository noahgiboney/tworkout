"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Input,
  Button,
  CircularProgress,
  Box,
} from "@chakra-ui/react";
import { useUser } from "@/context/userContext";
import styles from "../profile/profile.module.css";

interface WeightEntry {
  weight: number;
  date: Date;
}

const WeightLogger: React.FC = () => {
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [newWeight, setNewWeight] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useUser();

  const fetchWeightHistory = async () => {
    if (currentUser?.userId) {
      try {
        const response = await fetch(`/api/user/${currentUser.userId}/weight-history`);
        if (response.ok) {
          const weightHistoryList: WeightEntry[] = await response.json();
          const latestWeight = weightHistoryList.length > 0 ? weightHistoryList[weightHistoryList.length - 1].weight : undefined;
          setWeight(latestWeight);
        } else {
          console.error("Failed to fetch weight history:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching weight history:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWeight(parseFloat(e.target.value));
  };

  const handleLogWeight = async () => {
    if (currentUser && newWeight !== undefined) {
      try {
        const response = await fetch(`/api/user/${currentUser.userId}/weight-history`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weight: newWeight, date: new Date() }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error: ${response.statusText}, ${errorMessage}`);
        }

        await fetchWeightHistory();
        setNewWeight(undefined);
      } catch (error) {
        console.error("Error updating weight:", error);
      }
    }
  };

  useEffect(() => {
    fetchWeightHistory();
  }, [currentUser]);

  return (
    <Box>
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
        <Card marginTop="1rem" marginBottom="1rem" bgColor="#E9E4F2" className={styles.card}>
          <CardHeader paddingBottom="0rem">
            <Text fontSize={24} color="black">
              Your Weight
            </Text>
          </CardHeader>
          <CardBody>
            {weight !== undefined ? (
              <Text paddingTop="1rem" fontSize={18} color="black">
                Current Weight: {`${weight} lbs`}
              </Text>
            ) : (
              <Text paddingTop="1rem" fontSize={18} color="black">
                Update your weight
              </Text>
            )}
            <Input
              type="number"
              value={newWeight !== undefined ? newWeight.toString() : ""}
              onChange={handleWeightChange}
              placeholder="Enter new weight"
              mt={4}
            />
            <Button
              colorScheme="blue"
              mt={2}
              onClick={handleLogWeight}
            >
              Log Weight
            </Button>
            {error && (
              <Text color="red.500" mt={2}>
                {error}
              </Text>
            )}
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default WeightLogger;
