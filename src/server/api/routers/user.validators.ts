import { Role } from "@prisma/client";

import { z } from "zod";

export const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  role: z.nativeEnum(Role, {
    required_error: "Roles are Admin,PM,SoftwareDev, or Volunteer ",
    invalid_type_error: "Role must be chosen from Enum",
  }),
});

export type UserValidation = z.infer<typeof userSchema>;
