import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).optional(),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
