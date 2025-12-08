import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import type { Adapter } from "next-auth/adapters";

// Custom adapter that handles firstName and lastName
const baseAdapter = PrismaAdapter(prisma);
const customAdapter: Adapter = {
  ...baseAdapter,
  async createUser(user) {
    // Split name into firstName and lastName
    const nameParts = user.name?.split(" ") || ["", ""];
    const firstName = nameParts[0] || "User";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Generate a random password for OAuth users
    const randomPassword = randomBytes(32).toString("hex");

    const createdUser = await prisma.user.create({
      data: {
        email: user.email!,
        emailVerified: user.emailVerified ?? null,
        image: user.image ?? null,
        firstName,
        lastName,
        password: randomPassword,
      },
    });

    // Return in AdapterUser format
    return {
      id: createdUser.id,
      email: createdUser.email,
      emailVerified: createdUser.emailVerified ?? null,
      name: `${createdUser.firstName} ${createdUser.lastName}`.trim(),
      image: createdUser.image ?? null,
    };
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: customAdapter,
  trustHost: true, // Trust the host header (works for both dev and production)
  basePath: "/api/auth", // Explicit base path for NextAuth
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim(),
          image: user.image ?? null,
        };
      },
    }),
  ],
  // Removed events.createUser since we handle it in the custom adapter
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        // Ensure user has a password after sign in
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser && !existingUser.password) {
          const randomPassword = randomBytes(32).toString("hex");
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { password: randomPassword },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // When user signs in, add user ID to token
      // Note: user is only available on first sign in, not on subsequent requests
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      // On subsequent requests, token already has the data from the first sign in
      return token;
    },
    async session({ session, token }) {
      // Add user ID from token to session
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/en/login", // Use default locale for sign in page
    error: "/en/login",
  },
  session: {
    strategy: "jwt", // Use JWT for Edge Runtime compatibility (middleware)
  },
  secret: process.env.AUTH_SECRET,
});
