import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import User from "@/database/userSchema";



export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    
    const { email } = await req.json();

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 401 });
    }

    const response = NextResponse.json({ userId: user._id }, { status: 200 });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




