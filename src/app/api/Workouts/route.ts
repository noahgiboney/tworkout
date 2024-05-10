import connectDB from "@/database/db";
import Workout, { IWorkout } from "@/database/workoutSchema";
import { NextResponse, NextRequest } from "next/server";

// get all workouts in the collection
export async function GET() {
  try {
    await connectDB();
    const workouts = await Workout.find({});

    return NextResponse.json(workouts);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// add a new workout to the collection
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const workout: IWorkout = await req.json();
    const newWorkout = new Workout(workout)

    await newWorkout.save();
    return NextResponse.json("Workout added", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
