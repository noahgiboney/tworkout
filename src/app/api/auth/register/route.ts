import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { cookies } from "next/headers";

async function generateAccessToken(email: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { email: email },
      process.env.TOKEN_SECRET || "",
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token!);
        }
      }
    );
  });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, Email, and password are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already taken." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      name: name, 
      password: hashedPassword,
    });
    await newUser.save();
    

    const token = await generateAccessToken(newUser.email);
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 30 * 24 * 24, // 1 day
      sameSite: "lax",
    });
    const response = NextResponse.json(
      { message: "Login successful", userId: newUser._id },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
