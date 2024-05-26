"use client"
import React from "react";
import CustomCalendar from "../components/Calendar";
import SideBar from "../components/SideBar";
import { Box, flexbox } from "@chakra-ui/react";

const Calendar = () => {
  return (
    <Box bgColor="#130030" display="flex" flexDirection="row" paddingRight="20px">
      <SideBar />
      <Box alignItems="center" justifyContent="center" padding="50px">
        <CustomCalendar />
      </Box>
    </Box>
  );
};

export default Calendar;
