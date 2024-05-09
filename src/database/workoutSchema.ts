import mongoose from "mongoose";

interface IExercise {
  name: string;
  type: "Cardio" | "Weights";
}

interface ICardioExercise extends IExercise {
  duration: number;
  distance: number;
}

interface IWeightExercise extends IExercise {
  sets: number;
  reps: number;
  weight: number;
}

interface IWorkout {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  exercises: (ICardioExercise | IWeightExercise)[];
  date: Date;
}

const cardioExerciseSchema = new mongoose.Schema<ICardioExercise>({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Cardio"] },
  duration: { type: Number, required: true },
  distance: { type: Number, required: true },
});

const weightExerciseSchema = new mongoose.Schema<IWeightExercise>({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Weights"] },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const exerciseSchema = new mongoose.Schema<IExercise>(
  { type: String },
  { discriminatorKey: "type" }
);
const Exercise = mongoose.model<IExercise>("Exercise", exerciseSchema);
Exercise.discriminator("Cardio", cardioExerciseSchema);
Exercise.discriminator("Weights", weightExerciseSchema);

const workoutSchema = new mongoose.Schema<IWorkout>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.model<IWorkout>("Workout", workoutSchema);

export default Workout;
