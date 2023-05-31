import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validators";

const userQueriesRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx: { prisma, session } }) => {
    // TODO: add joins needed as inputs here
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      return user;
    }

    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Uh oh...",
    });
  }),
  getAll: protectedProcedure
    .input(cursorInput)
    .query(async ({ ctx: { prisma }, input }) => {
      let cursorObj = {};
      let whereObj = {};
      if (input) {
        if ("cursor" in input) {
          const { cursor } = input;
          cursorObj = { cursor: { id: cursor }, skip: 1 };
        } else {
          const { before, after } = input;
          whereObj = {
            where: {
              AND: [
                { createdAt: { lte: before } },
                { createdAt: { gte: after } },
              ],
            },
          };
        }
      }

      return prisma.user.findMany({
        select: { email: true, image: true },
        ...cursorObj,
        ...whereObj,
        take: 100,
      });
    }),
  getExpected: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx: { prisma }, input }) => {
      if (input)
        return prisma.userExpected.findUnique({ where: { email: input } });

      return prisma.userExpected.findMany({
        select: { email: true, createdAt: true, revokedAt: true },
      });
    }),
});

export default userQueriesRouter;
