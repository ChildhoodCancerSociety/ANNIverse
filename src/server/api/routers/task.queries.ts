import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validation";

const taskRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    const tasks = await prisma.task.findMany();
    return tasks;
  }),
});

export default taskRouter;
