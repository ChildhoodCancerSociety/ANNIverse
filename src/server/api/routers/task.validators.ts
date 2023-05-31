import { z } from "zod";

export const taskSchema = z.object({
  title: z.string({
    required_error: "Task title required",
    invalid_type_error: "Task title must be a string",
  }),
  description: z.string({
    required_error: "Provide task description",
    invalid_type_error: "Task description must be a string",
  }),
  deadline: z
    .date({
      required_error: "Provide task deadline",
      invalid_type_error: "Deadline must be a date",
    })
    .refine((date) => {
      return date > new Date(Date.now());
    }, "Task deadline must be set for a future date"),
  approved: z.boolean({
    required_error: "Is task approved? True or False",
    invalid_type_error: "Approved must be a boolean",
  }),
  status: z.string({
    required_error: "Please provide task status",
    invalid_type_error: "Status must be a string",
  }),
  teamId: z
    .string({
      required_error: "Please provide your TeamId",
      invalid_type_error: "TeamId must be a string",
    })
    .optional(),
});
export type TaskValidation = z.infer<typeof taskSchema>;
