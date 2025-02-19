import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
