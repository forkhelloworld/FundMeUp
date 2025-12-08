import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
process.env.AUTH_SECRET = "test-secret-key-for-testing-only";
process.env.GOOGLE_CLIENT_ID = "test-google-client-id";
process.env.GOOGLE_CLIENT_SECRET = "test-google-client-secret";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
process.env.TEST_DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://test:test@localhost:5432/test";
