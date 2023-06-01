import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validators";

const meetingMutationsRouter = createTRPCRouter({});

export default meetingMutationsRouter;
