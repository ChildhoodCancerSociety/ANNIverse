import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { taskSchema } from "./task.validators";

const prisma = new PrismaClient();

const taskMutationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(taskSchema)
    .mutation(async ({ ctx: { prisma }, input }) => {
      const {
        taskName,
        requirements,
        projectDueDate,
        submissionDueDate,
        approved,
        status,
        teamId,
      } = input;

      const task = await prisma.task.create({
        data: {
          taskName,
          requirements,
          projectDueDate,
          submissionDueDate,
          approved,
          status,
          teamId,
        },
        include: { team: true },
      });

      if (!task) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create the task.",
        });
      }

      return task;
    }),

  update: protectedProcedure
    .input(taskSchema.extend({ id: z.string().cuid() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const {
        id,
        taskName,
        requirements,
        projectDueDate,
        submissionDueDate,
        approved,
        status,
        teamId,
      } = input;

      const task = await prisma.task.update({
        where: { id },
        data: {
          taskName,
          requirements,
          projectDueDate,
          submissionDueDate,
          approved,
          status,
          teamId,
        },
        include: { team: true },
      });

      if (!task) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to update the task.",
        });
      }

      return task;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { id } = input;

      const task = await prisma.task.delete({
        where: { id },
      });

      if (!task) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete the task.",
        });
      }

      return true;
    }),
});

export default taskMutationsRouter;
