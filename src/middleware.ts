import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { parseCookies } from "nookies";

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

export default async function middleware(req: NextRequest) {
  const cookies = parseCookies({ req });
  const token =
    req.cookies.get("token")?.value || cookies["next-auth.session-token"];

  if (!token) {
    console.log("No token received");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    //req.nextUrl.searchParams.set('userId', payload.sub); // Example: pass user ID in URL
    return NextResponse.next();
  } catch (error) {
    console.log("JWT error:", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: [
    "/api/workouts",
    "/api/workouts/:path*",
    "/progress",
    "/homepage",
    "/calendar",
    "/profile",
  ],
};
