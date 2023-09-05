import { TRPCError } from "@trpc/server";
import { z } from "zod";
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

  updateUserInfo: protectedProcedure
  .input(z.object({handle: z.string(),name: z.string(), email: z.string()}))
  .mutation(async ({ctx, input}) =>{
    const userId = ctx.session.user.id;
    await ctx.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        handle: input.handle,
        name: input.name,
        email: input.email
      }
    });
    return {status: "Updated"}
  })

});

export default userMutationsRouter;
