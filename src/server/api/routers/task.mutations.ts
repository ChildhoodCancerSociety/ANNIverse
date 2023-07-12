import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cursorInput } from "./validators";

const taskMutationsRouter = createTRPCRouter({});

export default taskMutationsRouter;
