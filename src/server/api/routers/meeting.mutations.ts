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
          message: "Failed to create the meeting.",
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
          message: "Failed to update the meeting.",
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
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete the meeting.",
        });
      }

      return true;
    }),
});

export default meetingMutationsRouter;
