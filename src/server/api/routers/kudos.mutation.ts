import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { kudosSchema } from "./kudos.validators";
import AWS from 'aws-sdk';
import { env } from "@/env.mjs"; 

const s3 = new AWS.S3({
    credentials:{
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY
    },
    region: "us-east-1"
})

const BUCKET_NAME = env.BUCKET_NAME; //name of bucket to store kudos images

const kudosMutationsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(kudosSchema)
        .mutation(async ({ ctx: { session, prisma }, input }) => {
            const { giverId, receiverId, image, isPrivate, } = input;

            const kudos = await prisma.kudos.create({
                data:{
                    giverId: session.user.id,
                    receiverId,
                    isPrivate,
                },
            },
            );
            
            const uploadToS3 = await s3.putObject({
                Bucket: BUCKET_NAME,
                Body: Buffer.from(image!.replace(/^data:image\/\w+;base64,/, ""), "base64"),
                Key: kudos.id,
                ContentEncoding: "base64",
                ContentType: "image/png",
            }).promise();

            const updateImage = await prisma.kudos.update({
                where: {id: kudos.id},
                data:{
                    image: `https://${BUCKET_NAME}.s3.amazonaws.com/${kudos.id}`
                }
            })

            if (!kudos) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create the kudos.",
                });
            }

            return {kudos, uploadToS3 ,updateImage};

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