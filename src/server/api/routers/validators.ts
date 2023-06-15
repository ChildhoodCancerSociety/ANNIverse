import { z } from "zod";

export const cursorInput = z
  .union([
    z.object({
      before: z.date().default(() => new Date()),
      after: z.date().default(() => new Date(0)),
    }),
    z.object({
      cursor: z.string().cuid(),
    }),
  ])
  .optional();
