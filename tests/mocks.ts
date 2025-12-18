import { vi } from "vitest";

export const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
  },
  account: {
    findUnique: vi.fn(),
    create: vi.fn(),
    deleteMany: vi.fn(),
  },
  session: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
  },
};

export function resetMocks() {
  Object.values(mockPrisma).forEach((model) => {
    Object.values(model).forEach((method) => {
      if (typeof method === "function") {
        method.mockReset();
      }
    });
  });
}

