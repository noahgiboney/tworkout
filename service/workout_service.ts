import { IWorkout } from "@/database/workoutSchema";
import Workout from '../src/database/workoutSchema'

export const createWorkout = async (workoutData: IWorkout) => {
    const workout = new Workout(workoutData);
    return await workout.save();
  };
  
  export const findWorkoutsByUserId = async (userId: string) => {
    return await Workout.find({ userId });
  };
  