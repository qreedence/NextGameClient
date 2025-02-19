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
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schemas/resetPasswordSchema";
import { ResetPasswordDTO } from "@/types/ResetPasswordDTO";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const {
    resetPassword,
    isPending,
    isSuccess,
    checkPasswordResetToken,
    checkingPasswordResetToken,
  } = useResetPassword(token);

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordSchemaType) => {
    if (token) {
      const resetPasswordDTO: ResetPasswordDTO = {
        tokenId: token,
        password: values.newPassword,
      };
      resetPassword(resetPasswordDTO);
    }
  };

  if (!checkingPasswordResetToken && checkPasswordResetToken) {
    return (
      <Card className="w-[400px] mx-auto">
        <CardContent className="py-4">
          {isSuccess && (
            <div>
              <p>
                Password successfully reset. You can now{" "}
                <Link
                  className="ml-auto text-sm underline-offset-4 underline"
                  to="/login"
                >
                  log in
                </Link>
                .
              </p>
            </div>
          )}
          {!isSuccess && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 mt-6"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-1">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Set a new password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-1">
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Confirm your password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {isPending ? (
                    <PulseLoader color={"white"} size={7} />
                  ) : (
                    "Save Password"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    );
  }
};

export default ResetPassword;
