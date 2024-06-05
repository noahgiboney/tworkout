import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    token: string;
    id: string;
  }

  interface Session {
    email: string;
    accessToken: string;
    id: string;
  }

  interface JWT {
    email: string;
    token: string;
    id: string;
  }
}
