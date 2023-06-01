import { z } from "zod";

export const meetingSchema = z.object({
  title: z.string({
    required_error: "Provide meeting title",
    invalid_type_error: "Meeting title must be a string",
  }),
  description: z.string({
    required_error: "Provide meeting description",
    invalid_type_error: "Meeting description must be a string",
  }),
  date: z.coerce
    .date({
      required_error: "Provide meeting date",
      invalid_type_error: "Meeting date must be a date",
    })
    .refine((date) => {
      return date > new Date();
    }, "Meeting must be set for a future date"),
  time: z.coerce
    .date({
      required_error: "Provide meeting time",
      invalid_type_error: "Meeting time must be a date",
    })
    .refine((date) => {
      return date > new Date();
    }, "Meeting time must be set for a future date"),
});
export type MeetingValidation = z.infer<typeof meetingSchema>;
