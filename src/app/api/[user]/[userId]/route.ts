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

// update a user in the db
export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();

    const id = new mongoose.Types.ObjectId(params.userId);

    const updatedDoc = await User.findOneAndUpdate(
      { _id: id },
      { $set: await req.json() },
      { new: true }
    );

    if (!updatedDoc) {
      return new NextResponse("No user found with this ID", { status: 404 });
    }

    return NextResponse.json("User updated", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// delete a user from the db
export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const id = new mongoose.Types.ObjectId(params.userId);

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { error: "No user found with this id" },
        { status: 404 }
      );
    }

    return NextResponse.json("User Deleted", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}