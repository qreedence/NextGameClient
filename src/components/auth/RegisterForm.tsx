import { registerSchema, RegisterSchemaType } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterDTO } from "@/apiclient/models/RegisterDTO";
import useAuth from "@/hooks/useAuth";
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
import { PulseLoader } from "react-spinners";
import AlertError from "../ui/AlertError";

const RegisterComponent = () => {
  const { register, isPendingRegister, registerError } = useAuth();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterSchemaType) => {
    const registerDTO: RegisterDTO = {
      userName: values.userName,
      email: values.email,
      password: values.password,
    };
    register(registerDTO);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 mt-6">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                Your username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel className="flex justify-between">Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                Enter your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="flex justify-between">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                Enter your password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="flex justify-between">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                Enter your password again.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {registerError && <AlertError errorMessage={registerError.message} />}
        <Button type="submit" className="w-full">
          {isPendingRegister ? (
            <PulseLoader color={"white"} size={7} />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterComponent;
