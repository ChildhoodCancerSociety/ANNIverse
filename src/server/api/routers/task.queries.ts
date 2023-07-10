import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validators";

const prisma = new PrismaClient();

const taskQueriesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(cursorInput)
    .query(async ({ ctx: { prisma } }) => {
      const tasks = await prisma.task.findMany({
        include: { team: true },
      });
      return tasks;
    }),

  get: protectedProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input: id }) => {
      const task = await prisma.task.findUnique({
        where: { id },
        include: { team: true },
      });

      if (!task) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Task was not found.",
        });
      }

      return task;
    }),
});

export default taskQueriesRouter;
