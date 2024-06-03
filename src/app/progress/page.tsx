"use client";
import {
  Flex,
  Box,
  Select,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Workout {
  date: string;
  exercises: {
    name: string;
    type: "Cardio" | "Weights";
    sets?: { weight: number }[];
    distance?: number;
  }[];
}

interface WeightEntry {
  weight: number;
  date: string;
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
        borderColor: "#600086",
        backgroundColor: "rgba(136, 62, 227, 0.2)",
      },
    ],
  });
  const [exercises, setExercises] = useState<string[]>([]);
  const [exercise, setExercise] = useState<string>("");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);

  const { userId } = useUser();
  console.log(userId);

  useEffect(() => {
    const fetchExercises = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `/api/workouts/${userId}?fetch=exercises`
          );
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

    const fetchWeightHistory = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/user/${userId}/weight-history`);
          if (response.ok) {
            const weightHistoryList: WeightEntry[] = await response.json();
            setWeightHistory(weightHistoryList);
          } else {
            console.error(
              "Failed to fetch weight history:",
              await response.json()
            );
          }
        } catch (error) {
          console.error("Error fetching weight history:", error);
        }
      }
    };

    fetchExercises();
    fetchWorkouts();
    fetchWeightHistory();
  }, [userId]);

  const handleExerciseChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedExercise = e.target.value;
    setExercise(selectedExercise);

    if (selectedExercise === "weight") {
      handleWeightChange();
      return;
    }

    if (selectedExercise) {
      const selectedWorkouts = workouts.filter((workout) =>
        workout.exercises.some((ex) => ex.name === selectedExercise)
      );

      const dates = selectedWorkouts.map((workout) =>
        new Date(workout.date).toLocaleDateString()
      );
      const stats = selectedWorkouts
        .map((workout) => {
          const exerciseData = workout.exercises.find(
            (ex) => ex.name === selectedExercise
          );
          if (exerciseData) {
            return exerciseData.type === "Weights"
              ? exerciseData.sets![0].weight
              : exerciseData.distance;
          }
          return 0; // Default to 0 if exerciseData is not found
        })
        .map((value) => value ?? 0); // Ensure all values are numbers

      const type = selectedWorkouts.map((workout) => {
        const exerciseData = workout.exercises.find(
          (ex) => ex.name === selectedExercise
        );
        if (exerciseData) {
          return exerciseData.type === "Weights"
            ? ("Weight" as string)
            : ("Distance" as string);
        }
        return "" as string;
      });

      setData({
        labels: dates,
        datasets: [
          {
            label: type[0],
            data: stats,
            borderColor: "#600086",
            backgroundColor: "rgba(136, 62, 227, 0.2)",
          },
        ],
      });
    }
  };

  const handleWeightChange = () => {
    if (!Array.isArray(weightHistory)) {
      console.error("Weight history is not an array");
      return;
    }
    const dates = weightHistory.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    );
    const weights = weightHistory.map((entry) => entry.weight);

    setData({
      labels: dates,
      datasets: [
        {
          label: "Weight",
          data: weights,
          borderColor: "#600086",
          backgroundColor: "rgba(136, 62, 227, 0.2)",
        },
      ],
    });
  };

  const backgroundColor = useColorModeValue("#130030", "#130030");
  const textColor = useColorModeValue("white", "gray.200");
  const chartOptions = {
    maintainAspectRatio: false, // Allows resizing
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Progress Over Time",
      },
    },
  };

  return (
    <Flex h="100vh" bg={backgroundColor} color={textColor}>
      <SideBar />
      <Box flex="1" p="4">
        <Text fontSize="2xl" mb="4">
          Track Progress
        </Text>
        <VStack spacing={4} align="stretch">
          <Select
            icon={<TriangleDownIcon />}
            onChange={handleExerciseChange}
            bg="#600086"
            color="white"
            borderColor="#600086"
            _hover={{ borderColor: "purple.500" }}
            _focus={{ borderColor: "purple.500" }}
          >
            <option
              value="select"
              style={{ background: "#600086", color: "white" }}
            >
              -- Select Metric --
            </option>
            <option
              value="weight"
              style={{ background: "#600086", color: "white" }}
            >
              Body Weight
            </option>
            {exercises.map((exercise, index) => (
              <option
                key={index}
                value={exercise}
                style={{ background: "#600086", color: "white" }}
              >
                {exercise}
              </option>
            ))}
          </Select>
          <Box
            mt="4"
            bg="white"
            p="4"
            borderRadius="md"
            shadow="md"
            w="100%"
            h="700px"
          >
            <Line data={data} options={chartOptions} />
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Progress;
