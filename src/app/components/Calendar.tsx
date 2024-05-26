import Calendar from "react-calendar";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div>
      <Calendar
        className={styles.reactCalendar}
        onChange={onChange}
        value={value}
        tileClassName={({ date, view}) => {
            if (view === 'month') {
                return styles.reactCalendar__tile;
            }
        }}
      />
    </div>
  );
};

export default CustomCalendar;
