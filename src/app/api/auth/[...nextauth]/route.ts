import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { setCookie } from "nookies";
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
          resolve(token!); // Ensure token is a string
        }
      }
    );
  });
}

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = new User({
          email: user.email,
          password: "NULL", // Password is not relevant for Google sign-in
        });
        await dbUser.save();
      }

      const token = await generateAccessToken(user.email);
      user.token = token; // Attach the token to the user object
      user.id = dbUser._id.toString();
      cookies().set({
        name: "token",
        value: user.token,
        httpOnly: true,
        maxAge: 30 * 24 * 24, // 1 day
        sameSite: "lax",
      });
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token as string; // Ensure token is a string
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.accessToken) {
        session.accessToken = token.accessToken as string;
        session.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.TOKEN_SECRET,
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
