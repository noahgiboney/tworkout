import React, { useState } from "react";
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
  Input,
  useDisclosure,
  IconButton,
  UnorderedList,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { FcDownRight } from "react-icons/fc";
import { EditIcon } from "@chakra-ui/icons";
import { Workout } from "../calendar/page";

interface Props {
  workoutForDate: Workout | null;
}
const PopoverComponent = ({ workoutForDate }: Props) => {
  const [editMode, setEditMode] = useState(false);
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
                <UnorderedList>
                  {workoutForDate?.exercises.map((exercise, index) => {
                    return (
                      <ListItem key={index}>
                        {editMode === false ? (
                          <Text fontWeight="bold">{exercise.name}</Text>
                        ) : (
                          <Input
                            fontWeight="bold"
                            type="text"
                            variant="flushed"
                            value={exercise.name}
                          ></Input>
                        )}
                        <UnorderedList
                          styleType="''"
                          className={styles.listItem}
                        >
                          {exercise.type === "Cardio" && (
                            <>
                              <ListItem>
                                {editMode === false ? (
                                  <Text fontWeight="semibold">
                                    Distance: {exercise.distance} miles
                                  </Text>
                                ) : (
                                  <Box>
                                    <Text>Distance: </Text>
                                    <Input
                                      type="text"
                                      value={exercise.distance}
                                    ></Input>
                                  </Box>
                                )}
                              </ListItem>
                              <ListItem>
                                {editMode === false ? (
                                  <Text fontWeight="semibold">
                                    Duration: {exercise.duration} min
                                  </Text>
                                ) : (
                                  <Box>
                                    <Text>Duration: </Text>
                                    <Input
                                      type="text"
                                      value={exercise.duration}
                                    ></Input>
                                  </Box>
                                )}
                              </ListItem>
                            </>
                          )}
                          {exercise.type === "Weights" && (
                            <>
                              {exercise.sets?.map((set, index) => {
                                return (
                                  <ListItem key={index}>
                                    <Text fontWeight="semibold">
                                      Set {index + 1}:
                                    </Text>
                                    {!editMode ? (
                                      <Box paddingLeft="10px">
                                        <Text fontWeight="semibold">
                                          Reps: {set.reps}
                                        </Text>
                                        <Text fontWeight="semibold">
                                          Weight: {set.weight} lbs
                                        </Text>
                                      </Box>
                                    ) : (
                                      <Box>
                                        <Text>Reps: </Text>
                                        <Input value={set.reps} />
                                        <Text>Weight: </Text>
                                        <Input value={set.weight} />
                                      </Box>
                                    )}
                                  </ListItem>
                                );
                              })}
                            </>
                          )}
                        </UnorderedList>
                      </ListItem>
                    );
                  })}
                  {!workoutForDate && !editMode ? (
                    <Text>Plan or log a workout!</Text>
                  ) : (
                    ""
                  )}
                </UnorderedList>
                {editMode && <Button>Save</Button>}
              </Box>
              <IconButton
                flex="1"
                padding="0"
                color="black"
                bgColor="transparent"
                aria-label="edit"
                size="sm"
                icon={<EditIcon />}
                onClick={() => setEditMode(!editMode)}
              />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};

export default PopoverComponent;
