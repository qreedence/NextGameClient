import { z } from "zod";

export const settingsSchema = z.object({
  userName: z
    .string()
    .min(1, {
      message: "Username or emailmust be at least 1 character.",
    })
    .max(50, {
      message: "Username or email cannot be longer than 50 characters.",
    }),
  accountIsPublic: z.boolean().optional(),
});

export type SettingsSchemaType = z.infer<typeof settingsSchema>;
