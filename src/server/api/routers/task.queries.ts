import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validators";

const taskQueriesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(cursorInput)
    .query(async ({ ctx: { prisma } }) => {
      const tasks = await prisma.task.findMany({ include: { users: true } });
      return tasks;
    }),
});

export default taskQueriesRouter;
