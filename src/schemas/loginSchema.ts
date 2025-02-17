import { z } from "zod";

export const loginSchema = z.object({
  userNameOrEmail: z
    .string()
    .min(1, {
      message: "Username or emailmust be at least 1 character.",
    })
    .max(50, {
      message: "Username or email cannot be longer than 50 characters.",
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  rememberMe: z.boolean(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
