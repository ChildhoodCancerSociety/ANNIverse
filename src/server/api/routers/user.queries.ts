import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validation";

const userRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx: { prisma, session } }) => {
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
  modify: protectedProcedure.mutation(
    async ({ ctx: { prisma, session }, input }) => {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User is deleted or does not exist.",
        });
      }

      // TODO: finish this with prop drilling + internal RBAC
      // this is going to be a big function.

      return null;
    }
  ),
  delete: protectedProcedure.mutation(async ({ ctx: { prisma, session } }) => {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { deletedAt: new Date() },
      });
    } else {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User is deleted or does not exist.",
      });
    }

    return true;
  }),
});

export default userRouter;
