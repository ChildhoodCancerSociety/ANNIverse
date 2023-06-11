import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validators";

const meetingQueriesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(cursorInput)
    .query(async ({ ctx: { prisma } }) => {
      const meetings = await prisma.meeting.findMany({
        include: { users: true, teams: true },
      });
      return meetings;
    }),
  get: protectedProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input: id }) => {
      const meeting = await prisma.meeting.findUnique({
        where: { id },
        include: { users: true, teams: true },
      });

      if (!meeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting was not found.",
        });
      }

      return meeting;
    }),
});

export default meetingQueriesRouter;
