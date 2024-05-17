import connectDB from "@/database/db";
import mongoose from "mongoose";
import User from "@/database/userSchema";
import { NextResponse, NextRequest } from "next/server";

// get user by id
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();
    const id = new mongoose.Types.ObjectId(params.userId);
    console.log(id);
    const user = await User.findById(id);
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "No User Found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
