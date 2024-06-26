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
  Flex,
} from "@chakra-ui/react";
import { useUser } from "@/context/userContext";
import styles from "../profile/profile.module.css";

interface WeightEntry {
  weight: number;
  date: Date;
}

interface WeightLoggerProps {
  showStreak?: boolean;
}

interface Workout {
  date: Date;
}

const WeightLogger: React.FC<WeightLoggerProps> = ({ showStreak = false }) => {
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [newWeight, setNewWeight] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [streak, setStreak] = useState<number | undefined>(undefined);
  const [maxStreak, setMaxStreak] = useState<number | undefined>(undefined);
  const currentUser = useUser();

  const fetchWeightHistory = async () => {
    if (currentUser?.userId) {
      try {
        const response = await fetch(`/api/user/${currentUser.userId}/weight-history`);
        if (response.ok) {
          const weightHistoryList: WeightEntry[] = await response.json();
          const latestWeight = weightHistoryList.length > 0 ? weightHistoryList[weightHistoryList.length - 1].weight : undefined;
          setWeight(latestWeight);
          if (showStreak) {
            await fetchStreak();
          }
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

  const fetchStreak = async () => {
    if (currentUser?.userId) {
      try {
        const response = await fetch(`/api/workouts/${currentUser.userId}`);
        if (response.ok) {
          const workouts: Workout[] = await response.json();
          const { currentStreak, maxStreak } = calculateStreak(workouts);
          setStreak(currentStreak);
          setMaxStreak(maxStreak);
        } else {
          console.error("Failed to fetch workouts:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    }
  };

  const calculateStreak = (workouts: Workout[]): { currentStreak: number; maxStreak: number } => {
    if (workouts.length === 0) return { currentStreak: 0, maxStreak: 0 };
  
    console.log("Original workouts:", workouts);
  
    // Sort workouts by date in ascending order
    workouts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
    console.log("Sorted workouts:", workouts);
  
    let currentStreak = 1;
    let maxStreak = 1;
    let tempStreak = 1;
  
    for (let i = 1; i < workouts.length; i++) {
      const prevDate = new Date(workouts[i - 1].date);
      const currDate = new Date(workouts[i].date);
  
      // Calculate difference in calendar days
      const diff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      const calendarDiff = currDate.getDate() - prevDate.getDate();
  
      console.log(`Date difference between ${workouts[i].date} and ${workouts[i - 1].date}: ${calendarDiff} days`);
  
      if (calendarDiff === 1) {
        tempStreak++;
        if (tempStreak > maxStreak) {
          maxStreak = tempStreak;
        }
      } else if (calendarDiff > 1) {
        tempStreak = 1;
      }
  
      console.log(`Temporary streak: ${tempStreak}`);
      console.log(`Current max streak: ${maxStreak}`);
    }
    currentStreak = tempStreak;
  
    console.log(`Final current streak: ${currentStreak}`);
    console.log(`Final max streak: ${maxStreak}`);
  
    return { currentStreak, maxStreak };
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
    <Flex alignItems="stretch">
      <Box flex="1">
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress isIndeterminate color="purple.500" />
          </Box>
        ) : (
          <Card marginTop="1rem" marginBottom="1rem" bgColor="#E9E4F2" className={styles.card} height="100%">
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
              <Button colorScheme="blue" mt={2} onClick={handleLogWeight}>
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
      {showStreak && !isLoading && (
        <Box flex="1" marginLeft="1rem">
          <Card marginTop="1rem" marginBottom="1rem" bgColor="#E9E4F2" className={styles.card} height="100%">
            <CardHeader paddingBottom="0rem">
              <Text fontSize={24} color="black">
                Streak Information
              </Text>
            </CardHeader>
            <CardBody>
              <Text paddingTop="1rem" fontSize={18} color="black">
                Current Streak: {streak !== undefined ? `${streak} days` : "No streak data available"}
              </Text>
              <Text paddingTop="1rem" fontSize={18} color="black">
                Max Streak: {maxStreak !== undefined ? `${maxStreak} days` : "No max streak data available"}
              </Text>
            </CardBody>
          </Card>
        </Box>
      )}
    </Flex>
  );
};

export default WeightLogger;
