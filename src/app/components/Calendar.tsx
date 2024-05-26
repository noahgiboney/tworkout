import Calendar from "react-calendar";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.css";
import { Text } from "@chakra-ui/react";
import { Kumbh_Sans } from "next/font/google";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleRight, FaAngleLeft  } from "react-icons/fa";

const kumbhSans = Kumbh_Sans({ subsets: ["latin"] });
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
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

  return (
    <div>
      <Calendar
        className={styles.reactCalendar}
        onChange={onChange}
        value={value}
        navigationLabel={({ date, locale, view }) => {
          return (
            <Text fontFamily={kumbhSans.style.fontFamily} fontSize="40px">
              {monthNames[date.getMonth()]} {date.getFullYear()}
            </Text>
          );
        }}
        tileDisabled={({ activeStartDate, date, view }) => {
          return date.getMonth() !== activeStartDate.getMonth();
        }}
        tileClassName={({ view }) => {
          if (view === "month") {
            return styles.reactCalendar__tile;
          }
        }}
        nextLabel={<FaAngleRight />}
        next2Label={<FaAngleDoubleRight  />}
        prevLabel={<FaAngleLeft />}
        prev2Label={<FaAngleDoubleLeft />}
      />
    </div>
  );
};

export default CustomCalendar;
