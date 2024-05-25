"use client";
import {
  Flex,
  Box,
  Select,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { useUser } from "@/context/userContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRouter } from "next/router";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Workout {
  date: string;
  exercises: {
    name: string;
    type: "Cardio" | "Weights";
    sets?: { weight: number }[];
    distance?: number;
  }[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const Progress = () => {
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Weight",
        data: [],
        borderColor: "rgba(136, 62, 227, 1)",
        backgroundColor: "rgba(136, 62, 227, 0.2)",
      },
    ],
  });
  const [exercises, setExercises] = useState<string[]>([]);
  const [exercise, setExercise] = useState<string>("");
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const { userId } = useUser();
  console.log(userId);
  console.log("TEST");


  useEffect(() => {
    const fetchExercises = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/workouts/${userId}?fetch=exercises`);
          if (response.ok) {
            const exerciseList: string[] = await response.json();
            setExercises(exerciseList);
          } else {
            console.error("Failed to fetch exercises:", await response.json());
          }
        } catch (error) {
          console.error("Error fetching exercises:", error);
        }
      }
    };

    const fetchWorkouts = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/workouts/${userId}`);
          if (response.ok) {
            const workoutList: Workout[] = await response.json();
            setWorkouts(workoutList);
          } else {
            console.error("Failed to fetch workouts:", await response.json());
          }
        } catch (error) {
          console.error("Error fetching workouts:", error);
        }
      }
    };

    fetchExercises();
    fetchWorkouts();
  }, [userId]);

  const handleExerciseChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedExercise = e.target.value;
    setExercise(selectedExercise);

    if (selectedExercise) {
      const selectedWorkouts = workouts.filter(workout =>
        workout.exercises.some(ex => ex.name === selectedExercise)
      );

      const dates = selectedWorkouts.map(workout => new Date(workout.date).toLocaleDateString());
      const stats = selectedWorkouts.map(workout => {
        const exerciseData = workout.exercises.find(ex => ex.name === selectedExercise);
        if (exerciseData) {
          return exerciseData.type === "Weights" ? exerciseData.sets![0].weight : exerciseData.distance;
        }
        return 0; // Default to 0 if exerciseData is not found
      }).map(value => value ?? 0); // Ensure all values are numbers

      setData({
        labels: dates,
        datasets: [
          {
            label: "Weight",
            data: stats,
            borderColor: "rgba(136, 62, 227, 1)",
            backgroundColor: "rgba(136, 62, 227, 0.2)",
          },
        ],
      });
    }
  };

  const backgroundColor = useColorModeValue("gray.800", "gray.700");
  const textColor = useColorModeValue("white", "gray.200");
  const chartOptions = {
    maintainAspectRatio: false, // Allows resizing
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Progress Over Time',
      },
    },
  };

  return (
    <Flex h="100vh" bg={backgroundColor} color={textColor}>
      <SideBar />
      <Box flex="1" p="4">
        <Text fontSize="2xl" mb="4">Track Progress</Text>
        <VStack spacing={4} align="stretch">
          <Select
            placeholder="Select Exercise"
            onChange={handleExerciseChange}
            bg="#600086"
            color="white"
            borderColor="#600086"
            _hover={{ borderColor: "purple.500" }}
            _focus={{ borderColor: "purple.500" }}
          >
            {exercises.map((exercise, index) => (
              <option key={index} value={exercise} style={{ color: "black" }}>
                {exercise}
              </option>
            ))}
          </Select>
          <Box mt="4" bg="white" p="4" borderRadius="md" shadow="md" w="100%" h="500px">
            <Line data={data} options={chartOptions} />
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Progress;
