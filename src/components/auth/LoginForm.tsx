import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {useForm} from "react-hook-form"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { LoginDTO } from "@/apiclient/models/LoginDTO";
import { Checkbox } from "../ui/checkbox";
import useAuth from "@/services/useAuth";

const formSchema = z.object({
  userNameOrEmail: z.string().min(1, {
    message: "Username or emailmust be at least 1 character.",
  }).max(50, {
    message: "Username or email cannot be longer than 50 characters."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long."
  }),
  rememberMe: z.boolean(),
})

const LoginForm = () => {
    const {login} = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          userNameOrEmail: "",
          password: "",
          rememberMe: false,
        }
      });
      
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const loginDTO: LoginDTO = {
            userNameOrEmail: values.userNameOrEmail,
            password: values.password,
            rememberMe: values.rememberMe,
          };
          login(loginDTO);
        };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 mt-6">
                <FormField
                    control={form.control}
                    name="userNameOrEmail"
                    render={({ field }) => (
                        <FormItem className="grid gap-1">
                          <FormLabel>Username or email</FormLabel>
                          <FormControl>
                            <Input placeholder="Username or email" {...field} />
                          </FormControl>
                          <FormDescription className="sr-only">
                            You can log in using either your username or your email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}/>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="grid gap-1">
                            <FormLabel className="flex justify-between">
                                Password 
                                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                                    Forgot your password?
                                </a>
                            </FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                Enter your password
                            </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}/>
                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem className="flex gap-2 items-center justify-center">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormLabel className="flex justify-between">
                                Remember me? 
                            </FormLabel>
                          <FormDescription className="sr-only">
                            Enter your password
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                    )}/>
                <Button type="submit" className="w-full">Login</Button>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="underline underline-offset-4">
                    Sign up
                    </Link>
              </div>
            </form>
        </Form>
    )
}

export default LoginForm