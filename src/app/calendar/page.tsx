"use client";
import React, { useEffect, useState } from "react";
import CustomCalendar from "../components/Calendar";
import SideBar from "../components/SideBar";
import { Box } from "@chakra-ui/react";
import { useUser } from "@/context/userContext";
import styles from "./calendar.module.css";

export interface Workout {
  _id?: string;
  userId: string;
  date: Date;
  name: string;
  exercises: {
    name: string;
    type: "Cardio" | "Weights";
    sets?: { weight: number; reps: number }[];
    distance?: number;
    duration?: number;
  }[];
}

const Calendar = () => {
  const [exercises, setExercises] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [savedWorkout, setSavedWorkout] = useState<Workout>();
  const { userId } = useUser();

  //console.log(userId);
  useEffect(() => {
    //console.log(savedWorkout)
    fetchExercises();
    fetchWorkouts();
  }, [savedWorkout]);

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
          console.log("user workouts:", workoutList)
        } else {
          console.error("Failed to fetch workouts:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    }
  };

  const handleSave = (savedWorkout: Workout) => {
    setSavedWorkout(savedWorkout);
  };

  const getWorkoutsForDate = (date: Date): Workout | null => {
    console.log(workouts)
    if (date == null) return null;
    const dateString = date.toISOString().split("T")[0]; // Get the date in 'YYYY-MM-DD' format

    //console.log("datestring", dateString);
    const workoutForDate = workouts.find((workout) => {
      const workoutDateString = new Date(workout.date)
        .toISOString()
        .split("T")[0];

      console.log("workoutdatestring:", workoutDateString, "datestring", dateString)
      return workoutDateString === dateString;
    });

    if (workoutForDate) {
      //console.log(workoutForDate);
      return workoutForDate;
    } else return null;
  };

  return (
    <div className={styles.main}>
      <div>
        <SideBar />
      </div>
      <div className={styles.body}>
        <CustomCalendar onSave={handleSave} getWorkoutForDate={getWorkoutsForDate} />
      </div>
    </div>
  );
};

export default Calendar;
