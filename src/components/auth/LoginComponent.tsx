import { useEffect, useState } from "react";
import { ApiError, LoginDTO, OpenAPI } from "../../apiclient";
import Input from "../ui/Input";
import { LockKeyhole, User } from "lucide-react";
import AlertError from "../ui/AlertError";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import useAuth from "../../services/useAuth";

const LoginComponent = () => {
    OpenAPI.WITH_CREDENTIALS = true;
    const {isAuthenticated, login} = useAuth();
    const navigate = useNavigate();
    const [loginDTO, setLoginDTO] = useState<LoginDTO>({ 
            userNameOrEmail: "", 
            password: "",
            rememberMe: false
        });

    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

     const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setErrors([]);
            setSuccess(false);
    
            if (loginDTO.userNameOrEmail.length <= 0) {
                setErrors(["Username or email is required."]);
                return;
            }
    
            if (loginDTO.password.length <= 0){
                setErrors(["Passwords is required."]);
                return;
            }
        
            setLoading(true);
            try {
                login(loginDTO);
                setLoginDTO({ userNameOrEmail: "", password: "", rememberMe: false });
                setSuccess(true);
            } catch (err) {
                if (err instanceof ApiError && err.body) {
                    const errorMessages = err.body.map((e: { description: string }) => e.description);
                    setErrors(errorMessages);
                } else {
                    setErrors(["Something went wrong. Please try again."]); 
                }
            } finally {
                setLoading(false);
            }
          };

    useEffect(() => {
        if (success){
            navigate("/");
        }
    })

    if (isAuthenticated) {
        return null;    
      }
    
    if (!isAuthenticated){
        return (
            <div>
                <div className="fieldset w-md bg-base-100 border border-base-300 p-4 rounded-box">
                    <form name="loginForm">
                        <legend className="fieldset-legend text-xl font-bold">Log in</legend>
                            <Input
                                id={"userNameOrEmail"}
                                icon={<User className="mb-2.5"/>}
                                label={"Username or email"}
                                type={"text"}
                                value={loginDTO.userNameOrEmail}
                                onChange={(e) =>
                                    setLoginDTO((prev) => ({...prev, userNameOrEmail: e.target.value,}))}
                                />
                            <Input
                                id={"password"}
                                icon={<LockKeyhole className="mb-2.5"/>}
                                label={"Password"}
                                type={"password"}
                                value={loginDTO.password}
                                onChange={(e) =>
                                    setLoginDTO((prev) => ({...prev, password: e.target.value,}))}
                                />
                            
                            <div className="flex items-center justify-center gap-2 mx-auto mt-4">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    checked={loginDTO.rememberMe}
                                    onChange={(e) =>
                                        setLoginDTO((prev) => ({
                                            ...prev,
                                            rememberMe: e.target.checked,
                                        }))
                                    }
                                    className="checkbox checkbox-neutral"
                                />
                                <label htmlFor="rememberMe">Remember me?</label>
                            </div>
                            
                    {errors.length > 0 && (
                        <AlertError errorMessages={errors}/>
                    )}
                    {loading === true && !success 
                        ? <button disabled className="btn btn-neutral w-full mt-4">
                            <span className="loading loading-spinner"></span>
                                Logging in
                        </button> 
                        : <button type="submit" onClick={handleSubmit} className="btn btn-neutral w-full mt-4">Log in</button>
                    }
                    </form>
                <p className="text-center">Don't have an account yet? Create one <Link className="link link-hover font-bold" to="/register">here.</Link></p>
                <div className="divider">OR</div>
                <GoogleLoginButton/>
            </div>
        </div>
        )
    }
}

export default LoginComponent;