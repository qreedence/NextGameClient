import { useState } from "react";
import { ApiError, AuthService, RegisterDTO } from "../../apiclient";
import AlertError from "../ui/AlertError";
import { LockKeyhole, Mail, User} from "lucide-react";
import AlertSuccess from "../ui/AlertSuccess";
import FormValidationIcon from "../ui/FormValidationIcon";
import { validationService } from "../../services/validationService";
import Input from "../ui/Input";

const RegisterComponent = () => {
    const [registerDTO, setRegisterDTO] = useState<RegisterDTO>({ 
        userName: "", 
        email: "", 
        password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<boolean>(false);

    const validEmail = validationService.validateEmail(registerDTO.email);
    const validPassword = validationService.validatePassword(registerDTO.password);
    const passwordsMatch = validationService.validatePasswordsMatch(registerDTO.password, confirmPassword);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        setSuccess(false);

        if (!validEmail) {
            setErrors(["Invalid email format."]);
            return;
        }

        if (!validPassword){
            setErrors(["Passwords must be at least 8 characters."]);
            return;
        }
    
        if (!passwordsMatch) {
            setErrors(["Passwords do not match."])
            return;
        }
    
        setLoading(true);
        try {
          await AuthService.registerUser(registerDTO);
          setRegisterDTO({ email: "", userName: "", password: "" });
          setConfirmPassword("");
          setSuccess(true);
        } catch (err) {
            if (err instanceof ApiError && err.body) {
                const errorMessages = err.body.map((e: { description: string }) => e.description);
                setErrors(errorMessages);
            } else {
                setErrors(["Something went wrong. Please try again."]); 
            }
        } finally {
          setLoading(false)
        }
      };
    
    return (
        <form>
            <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend text-xl font-bold">Register</legend>
                        <Input
                            id={"username"}
                            icon={<User className="mb-2.5"/>}
                            label={"Username"}
                            type={"text"}
                            value={registerDTO.userName}
                            onChange={(e) =>
                                setRegisterDTO((prev) => ({...prev, userName: e.target.value,}))}
                            />
                        <Input
                            id={"email"}
                            icon={<Mail className="mb-2.5"/>}
                            label={"Email"}
                            type={"email"}
                            value={registerDTO.email}
                            onChange={(e) =>
                                setRegisterDTO((prev) => ({...prev, email: e.target.value,}))}
                            validationIcon={<FormValidationIcon valid={validEmail}/>}
                            />
                        <Input
                            id={"password"}
                            icon={<LockKeyhole className="mb-2.5"/>}
                            label={"Password"}
                            type={"password"}
                            value={registerDTO.password}
                            onChange={(e) =>
                                setRegisterDTO((prev) => ({...prev, password: e.target.value,}))}
                            validationIcon={<FormValidationIcon valid={validPassword}/>}
                            />
                        <Input
                            id={"confirmPassword"}
                            icon={<LockKeyhole className="mb-2.5"/>}
                            label={"Confirm password"}
                            type={"password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            validationIcon={<FormValidationIcon valid={passwordsMatch}/>}
                            />
                {errors.length > 0 && (
                    <AlertError errorMessages={errors}/>
                )}
                {success && (
                    <AlertSuccess successMessage={"Successfully registered. You can now "} url="https://www.google.com" linkText="log in."/>
                )}
                {loading === true && !success 
                    ? <button disabled className="btn btn-neutral mt-4">
                        <span className="loading loading-spinner"></span>
                            Registering
                      </button> 
                    : <button type="submit" onClick={handleSubmit} className="btn btn-neutral mt-4">Register</button>
                }
                <p className="text-center">Already have an account? Log in <a className="link link-hover font-bold" href="#">here.</a></p>
            </fieldset>
        </form>
    )};

export default RegisterComponent;