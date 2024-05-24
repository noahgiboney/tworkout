import connectDB from "@/database/db";
import mongoose from "mongoose";
import Workout from "@/database/workoutSchema";
import { NextResponse, NextRequest } from "next/server";

// get all workouts or unique exercises for a user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const userId = new mongoose.Types.ObjectId(params.id);

    const url = new URL(request.url);
    const fetchExercises = url.searchParams.get("fetch") === "exercises";

    if (fetchExercises) {
      // Fetch all unique exercises for the user
      const workouts = await Workout.find({ userId });

      const exercises = workouts.reduce((acc: Set<string>, workout) => {
        workout.exercises.forEach((exercise: any) => acc.add(exercise.name));
        return acc;
      }, new Set<string>());

      return NextResponse.json(Array.from(exercises));
    } else {
      // Fetch all workouts for the user
      const workouts = await Workout.find({ userId });

      if (workouts.length === 0) {
        return NextResponse.json({ error: "No Workouts Found" }, { status: 404 });
      }

      return NextResponse.json(workouts);
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// update a workout in the db
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const workoutId = new mongoose.Types.ObjectId(params.id);

    const updatedDoc = await Workout.findOneAndUpdate(
      { _id: workoutId },
      { $set: await req.json() },
      { new: true }
    );

    if (!updatedDoc) {
      return new NextResponse("No workout found with this ID", { status: 404 });
    }

    return NextResponse.json("Workout updated", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// delete a workout from the db 
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workoutId = new mongoose.Types.ObjectId(params.id);

    const result = await Workout.findByIdAndDelete(workoutId);

    if (!result) {
      return NextResponse.json(
        { error: "No workout found with this id" },
        { status: 404 }
      );
    }

    return NextResponse.json("Workout Deleted", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
