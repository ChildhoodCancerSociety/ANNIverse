import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { kudosSchema } from "./kudos.validators";

const kudosMutationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(kudosSchema)
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { giverId, receiverId, template, text, image, isPrivate } = input;

      const kudos = await prisma.kudos.create({
        data: {
          giverId,
          receiverId,
          template,
          text,
          image,
          isPrivate,
        },
      });

      if (!kudos) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create the kudos.",
        });
      }

      return kudos;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { id } = input;

      const kudos = await prisma.kudos.delete({
        where: { id },
      });

      if (!kudos) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete the kudos.",
        });
      }

      return true;
    }),
});

export default kudosMutationsRouter;
