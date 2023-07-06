import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

import type { AppRouter } from "./server/api/root";

/* eslint-disable */
/**
 * **READ**: USE THIS ONLY WHEN YOU HAVE TO ACCESS THE API STRICTLY OUTSIDE OF REACT-LAND (think NextAuth or some other internal service that requires construct/ teardown during application lifecycle)
 */
const UNSAFE_api = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});

export default UNSAFE_api;
