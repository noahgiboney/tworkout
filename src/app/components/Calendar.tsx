import Calendar from "react-calendar";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.css";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Kumbh_Sans } from "next/font/google";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";

import { Workout } from "../calendar/page";
const kumbhSans = Kumbh_Sans({ subsets: ["latin"] });
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  getWorkoutForDate: (date: Date) => Workout | null;
}

const CustomCalendar = ({ getWorkoutForDate }: Props) => {
  const [value, onChange] = useState<Value>(new Date());
  const colors = ["#E79BD3", "#D7A1F0"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  return (
    <Box height="100vh">
      <Calendar
        className={styles.reactCalendar}
        onChange={onChange}
        value={value}
        view="month"
        navigationLabel={({ date }) => {
          return (
            <Text fontFamily={kumbhSans.style.fontFamily} fontSize="40px">
              {monthNames[date.getMonth()]} {date.getFullYear()}
            </Text>
          );
        }}
        tileDisabled={({ activeStartDate, date }) => {
          return date.getMonth() !== activeStartDate.getMonth();
        }}
        tileClassName={({ view }) => {
          if (view === "month") {
            return styles.reactCalendar__tile;
          }
        }}
        tileContent={({ date }) => {
          const workoutForDate = getWorkoutForDate(date);
          if (!workoutForDate) return "";
          return (
            <Box borderRadius="5px" bg={getRandomColor()}>
              <Text
                padding="5px"
                fontWeight="semibold"
                fontFamily={kumbhSans.style.fontFamily}
              >
                {workoutForDate ? workoutForDate.name : ""}
              </Text>
            </Box>
          );
        }}
        nextLabel={<FaAngleRight />}
        next2Label={<FaAngleDoubleRight />}
        prevLabel={<FaAngleLeft />}
        prev2Label={<FaAngleDoubleLeft />}
      />
    </Box>
  );
};

export default CustomCalendar;
