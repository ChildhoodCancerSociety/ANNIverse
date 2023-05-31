import { createTRPCRouter } from "@/server/api/trpc";

import teamRouter from "./routers/team.queries";
import userRouter from "./routers/user.queries";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  team: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;