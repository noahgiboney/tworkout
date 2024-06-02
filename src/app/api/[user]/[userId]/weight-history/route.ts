import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();
    const user = await User.findById(params.userId).select("weight");

    if (!user) {
      return NextResponse.json({ error: "No User Found" }, { status: 404 });
    }

    return NextResponse.json(user.weight);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();
    const userId = params.userId;
    const { weight, date } = await request.json();

    if (!weight) {
      return NextResponse.json(
        { error: "Weight is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "No User Found" }, { status: 404 });
    }

    if (!user.weight) {
      user.weight = []; // Initialize the weight field as an array if it doesn't exist
    }

    user.weight.push({ weight, date: date || new Date() });
    await user.save();

    return NextResponse.json(
      { message: "Weight entry added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
