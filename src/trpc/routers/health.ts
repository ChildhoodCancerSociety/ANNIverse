import { publicProcedure, router } from "../server";

export const healthRouter = router({
  healthz: publicProcedure.query(() => "yay!"),
});
