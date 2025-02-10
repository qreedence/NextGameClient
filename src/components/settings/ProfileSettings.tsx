import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserSettingsDTO } from "../../apiclient/models/UserSettingsDTO";
import { SettingsService } from "../../apiclient/services/SettingsService";
import { useEffect, useState } from "react";
import Input from "../ui/Input";

const ProfileSettings = () => {
    const queryClient = useQueryClient();
    const {data: initialUserSettingsDTO, isLoading} = useQuery<UserSettingsDTO, Error>({
        queryKey: ["settings"],
        queryFn: async () => {
            return SettingsService.getUserSettings();
        },
        enabled: true
    });

    const [userSettingsDTO, setUserSettingsDTO] = useState<UserSettingsDTO>(initialUserSettingsDTO!);

    useEffect(() => {
        setUserSettingsDTO(initialUserSettingsDTO!);
      }, [initialUserSettingsDTO]);

    const {mutate: updateUserSettings} = useMutation<UserSettingsDTO, Error, UserSettingsDTO>({
        mutationFn: async(updatedSettings: UserSettingsDTO) => {
            return SettingsService.updateUserSettings(updatedSettings);
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({queryKey: ["settings"]});
            setUserSettingsDTO(data);
            queryClient.invalidateQueries({queryKey: ["currentUserProfile"]});
        },
        onError: (error) =>{
            console.error("Error updating settings:", error);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userSettingsDTO) {
          updateUserSettings(userSettingsDTO); 
        }
      };

    if(isLoading){
        <div>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }

    if (!userSettingsDTO || !initialUserSettingsDTO) {
        return <p>Error loading settings.</p>;
    }

    return (
        <form name="profileSettingsForm" onSubmit={handleSubmit} className="fieldset w-md bg-base-100 border border-base-300 p-4 rounded-box">
        <p>Avatar Url: {userSettingsDTO.avatar}</p>
        <Input 
            id={"username"} 
            label={"Username"} 
            type={"text"} 
            value={userSettingsDTO.userName} 
            onChange={(e) =>
                setUserSettingsDTO((prev) => ({...prev, userName: e.target.value,}))}
        />
        <div className="bg-base-100 border-base-300 border-2 rounded-md">
            <div className="bg-base-300 py-2 px-2">
            <label htmlFor="accountType" className="fieldset-label font-bold text-md">Account Type: {userSettingsDTO.accountIsPublic ? "Public" : "Private"}</label>
            </div>
            <div className="flex gap-2 py-2 px-2">
                <p className="">If your account is private, people can't search for you to add you as a friend.</p>
                <input 
                    id="accountType"
                    type="checkbox" 
                    checked={userSettingsDTO.accountIsPublic}
                    onChange={(e) =>
                        setUserSettingsDTO((prev) => ({
                            ...prev,
                            accountIsPublic: e.target.checked,
                        }))
                    } 
                    className="my-2 mx-2 toggle border-indigo-600 bg-indigo-500 checked:bg-indigo-500 checked:text-indigo-800 checked:border-indigo-600 " />
            </div>
            
        </div>
        <button type="submit" disabled={isLoading} className="btn btn-neutral">
            {isLoading ? "Updating..." : "Save Changes"}
        </button>
    </form>
    )
}

export default ProfileSettings;