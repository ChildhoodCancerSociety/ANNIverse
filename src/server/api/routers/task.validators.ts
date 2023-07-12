import { z } from "zod";

// Added comment for commit purposes
export const taskSchema = z.object({
  taskName: z.string({
    required_error: "Task name required",
    invalid_type_error: "Task name must be a string",
  }),
  requirements: z.string({
    required_error: "Provide task requirements",
    invalid_type_error: "Task requirements must be a string",
  }),
  projectDueDate: z
    .date({
      required_error: "Provide project due date",
      invalid_type_error: "Project due date must be a date",
    })
    .refine((date) => {
      return date > new Date(Date.now());
    }, "Project due date must be set for a future date"),
  submissionDueDate: z
    .date({
      required_error: "Provide submission due date",
      invalid_type_error: "Submission due date must be a date",
    })
    .refine((date) => {
      return date > new Date(Date.now());
    }, "Submission due date must be set for a future date"),
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
