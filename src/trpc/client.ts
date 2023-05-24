import { createTRPCReact } from "@trpc/react-query";

import { AppRouter } from "./server";

export const trpc = createTRPCReact<AppRouter>();
export const TrpcReactProvider = trpc.Provider;
export const useTrpc = trpc.useContext;
