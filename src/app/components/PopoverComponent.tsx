import React from "react";
import styles from "./Calendar.module.css";
import {
  Box,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Portal,
  PopoverCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Workout } from "../calendar/page";

interface Props {
  workoutForDate: Workout | null;
}
const PopoverComponent = ({ workoutForDate }: Props) => {
  //const workoutForDate = getWorkoutForDate(date);
  return (
    <Box position="absolute" top="-60px" right="-10px">
      <Popover placement="right-start">
        <PopoverTrigger>
          <IconButton aria-label="edit" size="sm" icon={<EditIcon />} />
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader fontSize="large" fontWeight="bold">
              <Text>Exercises</Text>
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody display="flex" flexDirection="row" padding="10px">
              <Box flex="5" padding="5px" paddingLeft="20px" marginBottom="5px">
                <ul>
                  {workoutForDate?.exercises.map((exercise, index) => {
                    return (
                      <li key={index}>
                        <Text fontWeight="bold">{exercise.name}</Text>
                        <ul className={styles.listItem}>
                          {exercise.type === "Cardio" && (
                            <>
                              <li>
                                <Text fontWeight="bold">
                                  Distance: {exercise.distance} miles
                                </Text>
                              </li>
                              <li>
                                <Text fontWeight="bold">
                                  Duration: {exercise.duration} min
                                </Text>
                              </li>
                            </>
                          )}
                          {exercise.type === "Weights" && (
                            <>
                              {exercise.sets?.map((set, index) => {
                                return (
                                  <li key={index}>
                                    <Text fontWeight="bold">
                                      Set {index + 1}:
                                    </Text>
                                    <Box paddingLeft="10px">
                                      <Text fontWeight="bold">
                                        Reps: {set.reps}
                                      </Text>
                                      <Text fontWeight="bold">
                                        Weight: {set.weight} lbs
                                      </Text>
                                    </Box>
                                  </li>
                                );
                              })}
                            </>
                          )}
                        </ul>
                      </li>
                    );
                  })}
                  {!workoutForDate ? <Text>Plan or log a workout!</Text> : ""}
                </ul>
              </Box>
              <IconButton
                flex="1"
                padding="0"
                color="black"
                bgColor="transparent"
                aria-label="edit"
                size="sm"
                icon={<EditIcon />}
              />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};

export default PopoverComponent;
