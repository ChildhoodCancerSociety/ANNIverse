import { PrismaClient } from "@prisma/client";
import type { Role } from "@prisma/client";

import { env } from "@/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const USER_ROLES: readonly Role[] = [
  "Admin",
  "Dev",
  "PM",
  "Volunteer",
] as const;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
