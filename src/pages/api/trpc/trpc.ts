import { createNextApiHandler } from "@trpc/server/adapters/next";

import { createContext } from "@/trpc/context";
import { appRouter } from "@/trpc/routers/_app";

export default createNextApiHandler({
  router: appRouter,
  createContext(opts) {
    return createContext({
      type: "api",
      ...opts,
    });
  },
});
