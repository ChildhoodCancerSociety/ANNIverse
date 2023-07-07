import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validators";

const teamQueriesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(cursorInput)
    .query(async ({ ctx: { prisma } }) => {
      const teams = await prisma.team.findMany({
        include: { users: true, meetings: true, tasks: true },
      });
      return teams;
    }),

  get: protectedProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input: id }) => {
      const team = await prisma.team.findUnique({
        where: { id },
        include: { users: true, meetings: true, tasks: true },
      });

      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team was not found.",
        });
      }

      return team;
    }),
});

export default teamQueriesRouter;
