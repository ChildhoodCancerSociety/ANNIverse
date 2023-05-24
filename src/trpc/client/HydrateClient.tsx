"use client";

import { createHydrateClient } from "@/trpc/next";

import superjson from "superjson";

export const HydrateClient = createHydrateClient({
  transformer: superjson,
});
