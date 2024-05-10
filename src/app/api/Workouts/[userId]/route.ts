import connectDB from "@/database/db";
import mongoose from "mongoose";
import Workout from "@/database/workoutSchema";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();
    const id = new mongoose.Types.ObjectId(params.userId)
    const workouts = await Workout.find({ userId: id });

    if (workouts.length === 0) {
      return NextResponse.json({ error: "No Workouts Found" }, { status: 404 });
    }

    return NextResponse.json(workouts);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
