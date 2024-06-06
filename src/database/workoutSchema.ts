import mongoose from "mongoose";

interface IExercise {
  name: string;
  type: "Cardio" | "Weights";
  duration?: number;  // Optional for Cardio
  distance?: number;  // Optional for Cardio
  sets?: {            // Optional for Weights
    reps: number;
    weight: number;
  }[];
}

export interface IWorkout {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  exercises: IExercise[];
  date: Date;
}

const exerciseSchema = new mongoose.Schema<IExercise>({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Cardio", "Weights"] },
  duration: { type: Number },
  distance: { type: Number },
  sets: [{
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
  }],
}, { _id: false });

const workoutSchema = new mongoose.Schema<IWorkout>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  exercises: { type: [exerciseSchema], required: true },
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

export default Workout;
