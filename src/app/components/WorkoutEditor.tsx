import React, { useState } from "react";
import { Workout } from "../calendar/page";
import {
  Box,
  Button,
  HStack,
  Input,
  VStack,
  Text,
  IconButton,
  NumberInput,
  NumberInputField,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import styles from "./Calendar.module.css"
import { BiSolidMinusCircle } from "react-icons/bi";
import { FiMinusCircle } from "react-icons/fi";

const WorkoutEditor = ({ initialWorkout }: { initialWorkout: Workout }) => {
  const [workout, setWorkout] = useState<Workout>(initialWorkout);
  const [add, setAdd] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [field]: value,
    }));
  };

  const handleExerciseChange = (index: number, field: string, value: any) => {
    const updatedExercises = workout.exercises.map((exercise, idx) => {
      if (idx === index) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: updatedExercises,
    }));
  };

  const handleSetChange = (
    exerciseIndex: number,
    setIndex: number,
    field: string,
    value: number
  ) => {
    const updatedExercises = workout.exercises.map((exercise, idx) => {
      if (idx === exerciseIndex && exercise.sets) {
        const updatedSets = exercise.sets.map((set, sIdx) => {
          if (sIdx === setIndex) {
            return { ...set, [field]: value };
          }
          return set;
        });
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: updatedExercises,
    }));
  };

  const handleAddExercise = (type: string) => {
    type === "Cardio" &&
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: [
        ...prevWorkout.exercises,
        { name: "", type: "Cardio", distance: 0, duration: 0 },
      ],
    }));
    type === "Weights" &&     
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: [
        ...prevWorkout.exercises,
        { name: "", type: "Weights", sets: []},
      ],
    }));
  };

  const handleRemoveExercise = (index: number) => {
    const updatedExercises = workout.exercises.filter(
      (_, idx) => idx !== index
    );
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: updatedExercises,
    }));
  };

  const handleAddSet = (exerciseIndex: number) => {
    const updatedExercises = workout.exercises.map((exercise, idx) => {
      if (idx === exerciseIndex && exercise.sets) {
        return {
          ...exercise,
          sets: [...exercise.sets, { weight: 0, reps: 0 }],
        };
      }
      return exercise;
    });
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: updatedExercises,
    }));
  };

  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = workout.exercises.map((exercise, idx) => {
      if (idx === exerciseIndex && exercise.sets) {
        const updatedSets = exercise.sets.filter(
          (_, sIdx) => sIdx !== setIndex
        );
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: updatedExercises,
    }));
  };

  const handleSave = async () => {
    // Implement API call to save the updated workout to the database

    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      if (response.ok) {
        // Handle successful save
        console.log("Workout updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Error updating workout:", errorData);
      }
    } catch (error) {
      console.error("Error saving workout:", error);
    } finally {
      setSaved(true);
    }
  };

  return (
    <VStack>
      {workout?.exercises.map((exercise, index) => (
        <Box key={index} border="1px solid gray" padding="4" borderRadius="md">
          <VStack>
            <HStack>
              <Input
                value={exercise.name}
                fontWeight="semibold"
                size="50px"
                variant="flushed"
                onChange={(e) =>
                  handleExerciseChange(index, "name", e.target.value)
                }
                placeholder="Exercise Name"
              />
              <IconButton
                size="100px"
                bgColor="white"
                color="purple.800"
                aria-label="delete"
                icon={<DeleteIcon />}
                onClick={() => handleRemoveExercise(index)}
              >
                Remove
              </IconButton>
            </HStack>

            {exercise.type === "Weights" && (
              <VStack>
                {exercise.sets?.map((set, setIndex) => (
                  <HStack key={setIndex}>
                    <Box>
                      <Text>Weight</Text>
                      <NumberInput
                        value={set.weight}
                        onChange={(valueString) =>
                          handleSetChange(
                            index,
                            setIndex,
                            "weight",
                            Number(valueString)
                          )
                        }
                      >
                        <NumberInputField />
                      </NumberInput>
                    </Box>
                    <Box>
                      <Text>Reps</Text>
                      <NumberInput
                        value={set.reps}
                        onChange={(valueString) =>
                          handleSetChange(
                            index,
                            setIndex,
                            "reps",
                            Number(valueString)
                          )
                        }
                      >
                        <NumberInputField />
                      </NumberInput>
                    </Box>
                    <IconButton
                      aria-label="delete-set"
                      size="100px"
                      marginTop="20px"
                      bgColor="white"
                      color="purple.800"
                      icon={<FiMinusCircle />}
                      onClick={() => handleRemoveSet(index, setIndex)}
                    />
                  </HStack>
                ))}
                <Button onClick={() => handleAddSet(index)}>Add Set</Button>
              </VStack>
            )}
            {exercise.type === "Cardio" && (
              <HStack>
                <Box>
                  <Text>Distance</Text>
                  <Input
                    value={exercise.distance || 0}
                    onChange={(e) =>
                      handleExerciseChange(
                        index,
                        "distance",
                        Number(e.target.value)
                      )
                    }
                    placeholder="Distance"
                  />
                </Box>
                <Box>
                  <Text>Duration</Text>
                  <Input
                    value={exercise.duration || 0}
                    onChange={(e) =>
                      handleExerciseChange(
                        index,
                        "duration",
                        Number(e.target.value)
                      )
                    }
                    placeholder="Duration"
                  />
                </Box>
              </HStack>
            )}
          </VStack>
        </Box>
      ))}
      <HStack>
        {/* <Button onClick={handleAddExercise}>Add Exercise</Button> */}
        <Menu>
          <MenuButton className={styles.menuButton} padding="9px" borderRadius="5px" fontWeight="semibold" color="#E9E4F2" bgColor="#600086">Add Exercise</MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleAddExercise("Cardio")}>
              Cardio
            </MenuItem>
            <MenuItem onClick={() => handleAddExercise("Weights")}>
              Weights
            </MenuItem>

          </MenuList>
        </Menu>
        <Button onClick={handleSave}>Save</Button>
      </HStack>
      {saved && <Text>Workout updated!</Text>}
    </VStack>
  );
};

export default WorkoutEditor;
