import { createTRPCNextLayout } from "@/trpc/next";

import superjson from "superjson";

import { getUser } from "./auth";
import { createContext } from "./context";
import { appRouter } from "./routers/_app";

export const rsc = createTRPCNextLayout({
  router: appRouter,
  transformer: superjson,
  createContext() {
    return createContext({
      type: "rsc",
      getUser,
    });
  },
});
