import { useState } from "react";
import { ApiError, AuthService, RegisterDTO } from "../../apiclient";
import AlertError from "../ui/AlertError";

const RegisterComponent = () => {
    const [registerDTO, setRegisterDTO] = useState<RegisterDTO>({ 
        userName: "", 
        email: "", 
        password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    //TODO:Keep working here
    const [success, setSuccess] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (registerDTO.password !== confirmPassword) {
          return;
        }
    
        setLoading(true);
        try {
          await AuthService.registerUser(registerDTO);
          setRegisterDTO({ email: "", userName: "", password: "" });
          setConfirmPassword("");
        } catch (err) {
            console.error("API Error:", err);

            if (err instanceof ApiError && err.body) {
                // Extract errors from API response
                const errorMessages = err.body.map((e: { description: string }) => e.description);
                setErrors(errorMessages);
            } else {
                setErrors(["Something went wrong. Please try again."]); // Fallback error
            }
        } finally {
          setLoading(false)
        }
      };
    
    return (
        <form>
            <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend">Register</legend>
                <label className="fieldset-label" htmlFor="username">Username</label>
                <input 
                    type="text"
                    id="username"
                    placeholder="Username" 
                    value={registerDTO.userName} 
                    onChange={(e) => 
                        setRegisterDTO((prev) => ({ 
                            ...prev, 
                            userName: e.target.value }))}
                    className="input"
                    required
                />     
                <label className="fieldset-label" htmlFor="email">Email</label> 
                <input 
                   type="email"
                   id="email"
                   placeholder="Email"
                   value={registerDTO.email}
                   onChange={(e) =>
                     setRegisterDTO((prev) => ({
                       ...prev,
                       email: e.target.value,
                     }))
                    }
                    className="input validator"
                    required
                />
                <div className="validator-hint">Enter valid email address</div>
                <label className="fieldset-label" htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={registerDTO.password} 
                    onChange={(e) => 
                        setRegisterDTO((prev) => ({ 
                            ...prev, 
                            password: e.target.value }))}
                    className="input"
                    required
                />
                <label className="fieldset-label" htmlFor="confirmPassword">Confirm password</label>
                <input 
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input"
                    required
                />
                {errors.length > 0 && (
                    <AlertError errorMessages={errors}/>
                )}
                {loading === true ? 
                    <button className="btn btn-neutral mt-4">
                        <span className="loading loading-spinner"></span>
                    </button> :
                    <button type="submit" onClick={handleSubmit} className="btn btn-neutral mt-4">Register</button>
                }
            </fieldset>
        </form>
    )};

export default RegisterComponent;