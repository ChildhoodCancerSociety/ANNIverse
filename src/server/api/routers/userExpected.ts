import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userExpectedRouter = createTRPCRouter({
  getUserEmail: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userExpected.findUnique({
      where: {
        email: ctx.session.user.email,
      },
    });
  }),
});
