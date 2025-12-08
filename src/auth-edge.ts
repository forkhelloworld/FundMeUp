import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Lightweight auth configuration for Edge Runtime (middleware)
// This doesn't include Prisma, bcrypt, or other heavy dependencies
// Providers are minimal - only used to satisfy NextAuth config, not for actual auth in middleware
export const { auth } = NextAuth({
  trustHost: true,
  basePath: "/api/auth",
  providers: [
    // Minimal provider - never used in middleware, only for JWT verification
    Credentials({
      credentials: {},
      authorize: async () => null,
    }),
  ],
  session: {
    strategy: "jwt", // JWT is required for Edge Runtime
  },
  secret: process.env.AUTH_SECRET,
});
