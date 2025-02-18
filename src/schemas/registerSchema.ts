import { z } from "zod";

export const registerSchema = z
  .object({
    userName: z
      .string()
      .min(1, {
        message: "Username be at least 1 character.",
      })
      .max(50, {
        message: "Username cannot be longer than 50 characters.",
      }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
