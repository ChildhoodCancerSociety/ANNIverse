import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { meetingSchema } from "./meeting.validators";

const meetingMutationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(meetingSchema)
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { title, description, date, time } = input;

      const meeting = await prisma.meeting.create({
        data: {
          title,
          description,
          date,
          time,
        },
      });

      if (!meeting) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create meeting.",
        });
      }

      return meeting;
    }),

  update: protectedProcedure
    .input(meetingSchema.extend({ id: z.string().cuid() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { id, title, description, date, time } = input;

      const meeting = await prisma.meeting.update({
        where: { id },
        data: { title, description, date, time },
      });

      if (!meeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found.",
        });
      }

      return meeting;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { id } = input;

      const meeting = await prisma.meeting.delete({
        where: { id },
      });

      if (!meeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found.",
        });
      }

      return true;
    }),
});

export default meetingMutationsRouter;
