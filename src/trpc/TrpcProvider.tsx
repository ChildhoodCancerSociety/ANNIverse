"use client";

import { useRef } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getFetch, httpBatchLink, loggerLink } from "@trpc/client";

import { TrpcReactProvider, trpc } from "./trpc";

const TrpcProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = useRef(
    new QueryClient({ defaultOptions: { queries: { staleTime: 10000 } } })
  ).current;

  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000/api/trpc";

  const trpcClient = useRef(
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
        }),
      ],
    })
  ).current;

  return (
    <TrpcReactProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </TrpcReactProvider>
  );
};

export default TrpcProvider;
