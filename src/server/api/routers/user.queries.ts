import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validation";

const userRouter = createTRPCRouter({
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
});

export default userRouter;
