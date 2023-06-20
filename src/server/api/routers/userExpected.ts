import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../trpc";

export const userExpectedRouter = createTRPCRouter({
    getUserEmail: protectedProcedure.query(({ctx}) =>{
        return ctx.prisma.userExpected.findUnique({
            where:{
                email: ctx.session.user.email,
            }
        })
    })
});