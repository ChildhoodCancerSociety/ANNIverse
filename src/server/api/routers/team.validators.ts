import { z } from "zod";

export const teamSchema = z.object({
  name: z.string({
    required_error: "Team name required",
    invalid_type_error: "Team name must be a string",
  }),
  description: z.string({
    required_error: "Team description required",
    invalid_type_error: "Team description must be a string",
  }),
});
export type TeamValidation = z.infer<typeof teamSchema>;
