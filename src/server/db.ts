import { PrismaClient } from "@prisma/client";
import type { Prisma, Role } from "@prisma/client";

import { env } from "@/env.mjs";

/**
 * Array with enumerated user roles sorted from lowest to highest privilege
 *
 *
 * Please absolutely do **NOT** change how this is sorted. Critical business logic relies on the order of this const array.
 * I know this is a terrible practice.
 * But it can also be awesome. I promise :)
 */
export const USER_ROLES: readonly Role[] = [
  "Volunteer",
  "Dev",
  "PM",
  "Admin",
] as const;
export type { Role };

const considerDeletedAt = (where?: Prisma.UserWhereInput) => {
  const newWhere = { ...where };
  if (newWhere && !newWhere.deletedAt) {
    newWhere.deletedAt = null;
  }
  return newWhere;
};

const createPrismaClient = () => {
  const prisma = new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
  return prisma.$extends({
    query: {
      user: {
        async findMany({ args, query }) {
          considerDeletedAt(args.where);
          return query(args);
        },
        async findFirst({ args, query }) {
          considerDeletedAt(args.where);
          return query(args);
        },
        async findUnique({ args, query }) {
          considerDeletedAt(args.where);
          return query(args);
        },
      },
    },
    result: {
      user: {
        deleted: {
          needs: {
            deletedAt: true,
          },
          compute({ deletedAt }) {
            return !!deletedAt;
          },
        },
        asString: {
          needs: { role: true, name: true, email: true, emailCcs: true },
          compute({ role, name, email, emailCcs }) {
            return `[${role ?? "NO_ROLE"}]: ${name ?? "NO_NAME"}<${
              email ?? "NO_EMAIL"
            } | ${emailCcs ?? "NO_CCS_EMAIL"}>>`;
          },
        },
      },
    },
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
