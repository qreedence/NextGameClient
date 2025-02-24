import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useResetPassword from "@/hooks/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword = () => {
  const { forgotPassword, isSuccessForgotPassword, isPendingForgotPassword } =
    useResetPassword();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    forgotPassword(values.email);
  };

  return (
    <Card className="w-[400px] mx-auto py-4">
      <CardContent>
        {isSuccessForgotPassword && (
          <p>
            If a user with that email exists, an email with a password reset
            link has been sent to that address.
          </p>
        )}
        {!isSuccessForgotPassword && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 mt-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Send an email to this address with a link to reset your
                      password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isPendingForgotPassword ? (
                  <PulseLoader color={"white"} size={7} />
                ) : (
                  "Send Email"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
