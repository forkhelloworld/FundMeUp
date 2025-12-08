import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const testPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
    },
  },
});

export async function createTestUser(overrides?: {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}) {
  const hashedPassword = await bcrypt.hash(overrides?.password || "testpassword123", 10);
  
  return await testPrisma.user.create({
    data: {
      email: overrides?.email || `test-${Date.now()}@example.com`,
      password: hashedPassword,
      firstName: overrides?.firstName || "Test",
      lastName: overrides?.lastName || "User",
    },
  });
}

export async function cleanupTestData() {
  // Clean up test users (those with test emails)
  await testPrisma.user.deleteMany({
    where: {
      email: {
        contains: "test-",
      },
    },
  });
  
  // Clean up test accounts
  await testPrisma.account.deleteMany({
    where: {
      user: {
        email: {
          contains: "test-",
        },
      },
    },
  });
  
  // Clean up test sessions
  await testPrisma.session.deleteMany({
    where: {
      user: {
        email: {
          contains: "test-",
        },
      },
    },
  });
}

