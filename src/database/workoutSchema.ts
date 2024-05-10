import mongoose from "mongoose";

interface IExercise {
  name: string;
  type: "Cardio" | "Weights";
}

interface IExerciseSet {
  reps: number;
  weight: number;
}

interface IWeightExercise extends IExercise {
  sets: IExerciseSet[];
}

interface ICardioExercise extends IExercise {
  duration: number;
  distance: number;
}

interface IWorkout {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  exercises: (ICardioExercise | IWeightExercise)[];
  date: Date;
}

const exerciseSetSchema = new mongoose.Schema<IExerciseSet>({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const weightExerciseSchema = new mongoose.Schema<IWeightExercise>({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Weights"] },
  sets: [exerciseSetSchema],
});

const cardioExerciseSchema = new mongoose.Schema<ICardioExercise>({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Cardio"] },
  duration: { type: Number, required: true },
  distance: { type: Number, required: true },
});

const workoutSchema = new mongoose.Schema<IWorkout>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  exercises: [new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ["Cardio", "Weights"] },
    duration: { type: Number },
    distance: { type: Number },
    sets: [exerciseSetSchema]
  }, { discriminatorKey: "type" })], 
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.models.Workout || mongoose.model("Workout", workoutSchema)
if (!Workout.discriminators || !Workout.discriminators.Cardio) {
  Workout.discriminator("Cardio", cardioExerciseSchema);
}
if (!Workout.discriminators || !Workout.discriminators.Weights) {
  Workout.discriminator("Weights", weightExerciseSchema);
}

export default Workout;