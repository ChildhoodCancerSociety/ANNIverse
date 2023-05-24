import { TRPCError, initTRPC } from "@trpc/server";

import superjson from "superjson";
import { ZodError } from "zod";

import { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zod:
          error.cause instanceof ZodError
            ? error.cause.flatten().fieldErrors
            : null,
      },
    };
  },
});

export const authProcedure = t.procedure.use(
  t.middleware(async ({ next, ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to use this procedure.",
      });
    }
    console.log(ctx);
    return next({
      ctx: {
        ...ctx,
      },
    });
  })
);

/* eslint-disable prefer-destructuring */
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const privateProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You have to be logged in to do this",
    });
  }
  return opts.next({
    ctx: {
      user: opts.ctx.user,
    },
  });
});
/* eslint-enable prefer-destructuring */

export const appRouter = t.router({
  getUser: authProcedure.query(({ ctx }) => {
    console.log(ctx.type);
    return true;
  }),
});

export type AppRouter = typeof appRouter;
