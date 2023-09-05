import { createTRPCRouter, mergeTRPCRouters } from "@/server/api/trpc";

import meetingMutationRouter from "./routers/meeting.mutations";
import meetingQueryRouter from "./routers/meeting.queries";
import taskMutationRouter from "./routers/task.mutations";
import taskQueryRouter from "./routers/task.queries";
import teamMutationRouter from "./routers/team.mutations";
import teamQueryRouter from "./routers/team.queries";
import userMutationRouter from "./routers/user.mutations";
import userQueryRouter from "./routers/user.queries";
import kudosQueriesRouter from "./routers/kudos.queries";
import kudosMutationsRouter from "./routers/kudos.mutation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: mergeTRPCRouters(userQueryRouter, userMutationRouter),
  team: mergeTRPCRouters(teamQueryRouter, teamMutationRouter),
  task: mergeTRPCRouters(taskQueryRouter, taskMutationRouter),
  meeting: mergeTRPCRouters(meetingQueryRouter, meetingMutationRouter),
  kudos: mergeTRPCRouters(kudosQueriesRouter, kudosMutationsRouter),
});

// export type definition of API
export type AppRouter = typeof appRouter;
