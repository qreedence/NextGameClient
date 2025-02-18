import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useChangePassword from "@/hooks/useChangePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/schemas/changePasswordSchema";
import { ChangePasswordDTO } from "@/apiclient";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import PulseLoader from "react-spinners/PulseLoader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";

const ChangePassword = () => {
  const { userProfile } = useAuth();
  const { changePassword, isPending } = useChangePassword();

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordSchemaType) => {
    let newPassword: ChangePasswordDTO;
    if (userProfile?.hasPassword) {
      newPassword = {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
    } else {
      newPassword = {
        newPassword: values.newPassword,
      };
    }
    await changePassword(newPassword);
    form.reset({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  if (userProfile !== undefined) {
    return (
      <Card>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-4 mt-6"
            >
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem
                    className={
                      userProfile.hasPassword === false
                        ? "hidden"
                        : "grid gap-1 w-full"
                    }
                  >
                    <div className="grid gap-4 grid-cols-2">
                      <div className="flex flex-col">
                        <FormLabel className="text-md font-semibold tracking-wide">
                          Current password
                        </FormLabel>
                        <FormDescription className="sr-only">
                          Your current password.
                        </FormDescription>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-1 w-full">
                    <div className="grid gap-4 grid-cols-2">
                      <div className="flex flex-col">
                        <FormLabel className="text-md font-semibold tracking-wide">
                          New password
                        </FormLabel>
                        <FormDescription className="sr-only">
                          Your new password.
                        </FormDescription>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-1 w-full">
                    <div className="grid gap-4 grid-cols-2">
                      <div className="flex flex-col">
                        <FormLabel className="text-md font-semibold tracking-wide">
                          Confirm new password
                        </FormLabel>
                        <FormDescription className="sr-only">
                          Your new password, again.
                        </FormDescription>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-[50%] mt-6"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isPending ? <PulseLoader color={"white"} /> : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }
};
export default ChangePassword;
