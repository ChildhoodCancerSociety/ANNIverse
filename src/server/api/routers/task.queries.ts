import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validators";

const prisma = new PrismaClient();

type CursorType =
  | { cursor?: { id: string }; take?: number }
  | { where?: { createdAt: { lte?: Date; gte?: Date } }; take?: number };

const taskQueriesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(cursorInput)
    .query(async ({ ctx: { prisma }, input }) => {
      let cursor: CursorType = {};

      if (input) {
        if ("cursor" in input) {
          cursor = { cursor: { id: input.cursor }, take: 100 };
        } else if ("before" in input || "after" in input) {
          cursor = {
            where: { createdAt: { lte: input.before, gte: input.after } },
          };
        }
      }

      const tasks = await prisma.task.findMany({
        include: { team: true },
        ...cursor,
      });

      return tasks;
    }),

  get: protectedProcedure
    .input(z.string().cuid())
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
