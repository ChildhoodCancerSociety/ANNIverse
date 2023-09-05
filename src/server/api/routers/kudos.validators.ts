import { z } from "zod";

export const kudosSchema = z.object({
    giverId: z.string({
        required_error: "Provide giver's id",
        invalid_type_error: "Giver's id must be a string",
    }),
    receiverId: z.string({
        required_error: "Provide receiver's id",
        invalid_type_error: "Receiver's id must be a string",
    }),
    // template: z.enum(["TEMPLATE1", "TEMPLATE2", "TEMPLATE3"]), // Modify as per your templates
    // text: z.string({
    //     required_error: "Provide kudos text",
    //     invalid_type_error: "Kudos text must be a string",
    // }),
    image: z.string().optional(),
    isPrivate: z.boolean().optional(),
});

export type KudosValidation = z.infer<typeof kudosSchema>;