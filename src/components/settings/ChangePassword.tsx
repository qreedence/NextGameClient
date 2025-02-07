import { useMutation } from "@tanstack/react-query";
import { ApiError, ChangePasswordDTO, SettingsService } from "../../apiclient";
import { useStore } from "../../stores/useStore";
import { useState } from "react";
import Input from "../ui/Input";
import { validationService } from "../../services/validationService";
import AlertError from "../ui/AlertError";
import { Check } from "lucide-react";

const ChangePassword = () => {
    const {userProfile, getUserProfile} = useStore();
    const [changePasswordDTO, setChangePasswordDTO] = useState<ChangePasswordDTO>({
        oldPassword: "",
        newPassword: "",
    })
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<boolean>(false);
    const validPassword = validationService.validatePassword(changePasswordDTO.newPassword);
    const passwordsMatch = validationService.validatePasswordsMatch(changePasswordDTO.newPassword, confirmNewPassword);

    const {mutate: changePassword, isPending} = useMutation<ChangePasswordDTO, Error, ChangePasswordDTO>({
        mutationFn: async(updatedPassword: ChangePasswordDTO) => {
            return SettingsService.changePassword(updatedPassword);   
        },
        onSuccess: async () => {
            await getUserProfile();
            setSuccess(true);
            setChangePasswordDTO({oldPassword: "", newPassword: ""});
            setConfirmNewPassword("");
        },
        onError: (err) =>{
            if (err instanceof ApiError && err.body) {
                const errorMessages = err.body.map((e: { description: string }) => e.description);
                setErrors(errorMessages);
            } else {
                setErrors(["Something went wrong. Please try again."]); 
            }
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        if (!validPassword){
            setErrors(["Passwords must be at least 8 characters."]);
            return;
        }
    
        if (!passwordsMatch) {
            setErrors(["Passwords do not match."])
            return;
        }
        changePassword(changePasswordDTO);
    }

    if (userProfile && userProfile.hasPassword){
        return (
            <form name="changePasswordForm" onSubmit={handleSubmit} className="fieldset w-md bg-base-100 border border-base-300 p-4 rounded-box">
                <Input 
                    id={"currentPassword"} 
                    label={"Current password"}
                    type={"password"} 
                    value={changePasswordDTO.oldPassword || ""}
                    onChange={(e) =>{
                        setChangePasswordDTO((prev) => ({...prev, oldPassword: e.target.value,}))}
                    }
                 />
                 <Input 
                    id={"newPassword"} 
                    label={"New password"}
                    type={"password"} 
                    value={changePasswordDTO.newPassword || ""} 
                    onChange={(e) =>
                        setChangePasswordDTO((prev) => ({...prev, newPassword: e.target.value,}))}
                 />
                 <Input 
                    id={"confirmNewPassword"} 
                    label={"Confirm new password"}
                    type={"password"} 
                    value={confirmNewPassword} 
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                 />
            {errors.length > 0 && (
                <AlertError errorMessages={errors}/>
            )}
                <button type="submit" disabled={isPending || success} className="btn btn-neutral">
                    {isPending && !success ? "Updating..." : "Save Changes"}{success && <Check className="ml-2"/>}
                </button>
            </form>
        )
    }

    if (userProfile && !userProfile.hasPassword){
        return(
        <form name="changePasswordForm" onSubmit={handleSubmit} className="fieldset w-md bg-base-100 border border-base-300 p-4 rounded-box">
            <Input 
                    id={"setPassword"} 
                    label={"Set password"}
                    type={"password"} 
                    value={changePasswordDTO.newPassword || ""} 
                    onChange={(e) =>
                        setChangePasswordDTO((prev) => ({...prev, newPassword: e.target.value,}))}
                 />
                 <Input 
                    id={"confirmPassword"} 
                    label={"Confirm password"}
                    type={"password"} 
                    value={confirmNewPassword} 
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                 />
            {errors.length > 0 && (
                <AlertError errorMessages={errors}/>
            )}
                <button type="submit" disabled={isPending} className="btn btn-neutral">
                    {isPending ? "Updating..." : "Save Changes"}
                </button>
        </form>
        )
        
    }
    
}

export default ChangePassword;