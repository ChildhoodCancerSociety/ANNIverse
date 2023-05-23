import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<{}>();
export const TrpcReactProvider = trpc.Provider;
export const useTrpc = trpc.useContext;
