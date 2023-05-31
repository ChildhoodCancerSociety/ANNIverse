import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validators";

const meetingQueriesRouter = createTRPCRouter({});

export default meetingQueriesRouter;
