import React, { useState } from "react";
import styles from "./Calendar.module.css";
import WorkoutEditor from "./WorkoutEditor";
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
  date: Date;
  onSave: (savedWorkout: Workout) => void;
}
const PopoverComponent = ({ workoutForDate, date, onSave }: Props) => {
  const [workout, setWorkout] = useState(workoutForDate)



  return (
    <Box position="absolute" top="-60px" right="-10px">
      <Popover placement="right-start">
        <PopoverTrigger>
          <IconButton aria-label="edit" size="sm" icon={<EditIcon />} />
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            {/* <PopoverHeader fontSize="large" fontWeight="bold">
              <Text>{workout ? workout.name : "Exercises"}</Text>
            </PopoverHeader> */}
            <PopoverCloseButton />
            <PopoverBody display="flex" flexDirection="row" padding="10px">
              {<WorkoutEditor date={date} onSave={onSave} initialWorkout={workout}/> }
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};

export default PopoverComponent;
