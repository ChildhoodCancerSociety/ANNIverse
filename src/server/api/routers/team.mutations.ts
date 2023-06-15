import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { teamSchema } from "./team.validators";

const taskMutationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(teamSchema)
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { name, description } = input;

      const team = await prisma.team.create({
        data: {
          name,
          description,
        },
      });

      if (!team) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create the team.",
        });
      }

      return team;
    }),

  update: protectedProcedure
    .input(teamSchema.extend({ id: z.string().cuid() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { id, name, description } = input;

      const team = await prisma.team.update({
        where: { id },
        data: {
          name,
          description,
        },
      });

      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to update the team.",
        });
      }

      return team;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { id } = input;

      const team = await prisma.team.delete({
        where: { id },
      });

      if (!team) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete the team.",
        });
      }

      return true;
    }),
});

export default taskMutationsRouter;
