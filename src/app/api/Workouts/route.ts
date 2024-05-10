import connectDB from "@/database/db";
import Workout from "@/database/workoutSchema";
import { NextResponse, NextRequest } from "next/server";

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
