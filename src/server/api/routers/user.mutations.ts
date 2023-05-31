import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const userMutationsRouter = createTRPCRouter({
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

export default userMutationsRouter;
