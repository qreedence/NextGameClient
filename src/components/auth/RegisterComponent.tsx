import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RegisterForm from "./RegisterForm";
import GoogleLoginButton from "./GoogleLoginButton";
import useAuth from "@/hooks/useAuth";

const RegisterComponent = () => {
  const { isSuccessRegister } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccessRegister && (
            <div>
              <p>Registered! You can now log in.</p>
            </div>
          )}
          {!isSuccessRegister && (
            <>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <GoogleLoginButton />
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <RegisterForm />
              <p className="text-sm text-muted mt-2 text-center">
                Already have an account? Log in{" "}
                <Link className="link link-hover font-bold" to="/login">
                  here.
                </Link>
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking Register, you agree to our{" "}
        <Link to="/termsofservice">Terms of Service</Link> and{" "}
        <Link to="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default RegisterComponent;
