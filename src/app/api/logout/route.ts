import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  // Clear the cookie by setting its expiration to a past date
  cookies().set({
    name: "token",
    value: "",
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
  });

  // Send a response indicating that logout was successful
  const response = NextResponse.json(
    { message: "Loggin out" },
    { status: 200 }
  );
  return response;
}
