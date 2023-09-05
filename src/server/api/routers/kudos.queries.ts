import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const kudosQueriesRouter = createTRPCRouter({
    getAll: protectedProcedure
        // .input(z.object({ userId: z.string().optional() }))
        .query(async ({ ctx: { prisma }, input }) => {
            // const { userId } = input;
            const kudos = await prisma.kudos.findMany({
                select: {giverId: true, receiverId: true, image: true, isPrivate: true}
            });

            return kudos;
        }),
    get: protectedProcedure
        .input(z.string())
        .query(async ({ ctx: { prisma }, input: id }) => {
            const kudos = await prisma.kudos.findUnique({
                where: { id },
            });

            if (!kudos) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Kudos was not found.",
                });
            }

            return kudos;
        }),
});

export default kudosQueriesRouter;