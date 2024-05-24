import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { cookies } from 'next/headers'



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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await generateAccessToken(email);
    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 30 * 24 * 24, // 1 day
      sameSite: "lax"
    });
    const response = NextResponse.json({ message: "Login successful", userId: user._id }, { status: 200 });
    response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Secure; SameSite=lax; Max-Age=86400`);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




