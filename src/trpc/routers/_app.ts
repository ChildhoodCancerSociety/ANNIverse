/**
 * This file contains the root router of your tRPC-backend
 */
import { privateProcedure, publicProcedure, router } from "../server";
import { healthRouter } from "./health";

export const appRouter = router({
  health: healthRouter,
  whoami: publicProcedure.query(({ ctx }) => ctx.user),
  secret: privateProcedure.query(() => "cow level"),
});

export type AppRouter = typeof appRouter;
