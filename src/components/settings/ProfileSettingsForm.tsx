import { UserSettingsDTO } from "@/apiclient/models/UserSettingsDTO";
import useSettings from "@/hooks/useSettings";
import { settingsSchema, SettingsSchemaType } from "@/schemas/settingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect } from "react";

const ProfileSettingsForm = () => {
  const { userSettings, updateUserSettings, isPending, isLoading } =
    useSettings();

  const form = useForm<SettingsSchemaType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      userName: "",
      accountIsPublic: false,
    },
  });

  const onSubmit = (values: SettingsSchemaType) => {
    if (userSettings) {
      const updatedSettings: UserSettingsDTO = {
        userId: userSettings.userId,
        avatar: userSettings.avatar,
        hasPassword: userSettings.hasPassword,
        userName: values.userName,
        accountIsPublic: values.accountIsPublic,
      };
      updateUserSettings(updatedSettings);
    }
  };

  useEffect(() => {
    if (userSettings) {
      form.reset({
        userName: userSettings.userName || "",
        accountIsPublic: userSettings.accountIsPublic || false,
      });
    }
  }, [userSettings, form]);

  if (!isLoading && userSettings && userSettings.userName) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 mt-6"
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="grid gap-1 w-full">
                <div className="grid gap-4 grid-cols-2">
                  <div className="flex flex-col">
                    <FormLabel className="text-md font-semibold tracking-wide">
                      Username
                    </FormLabel>
                    <FormDescription>Change your username.</FormDescription>
                  </div>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountIsPublic"
            render={({ field }) => (
              <FormItem className="grid gap-1 w-full">
                <div className="grid gap-4 grid-cols-2">
                  <div className="flex flex-col">
                    {" "}
                    <FormLabel className="text-md font-semibold tracking-wide">
                      Account Type
                    </FormLabel>
                    <FormDescription>
                      Set your account type. If your account type is set to
                      private, people will not be able search for you or add you
                      as a friend.
                    </FormDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <p>Private</p>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <p>Public</p>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[50%] mt-6" disabled={isPending}>
            {isPending ? <PulseLoader color={"white"} /> : "Save Changes"}
          </Button>
        </form>
      </Form>
    );
  }
};

export default ProfileSettingsForm;
