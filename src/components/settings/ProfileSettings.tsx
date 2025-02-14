import { UserSettingsDTO } from "../../apiclient/models/UserSettingsDTO";
import { useEffect, useState } from "react";
import Input from "../ui/Input";
import UploadProfilePicture from "../uploadthing/UploadProfilePicture";
import useSettings from "../../services/useSettings";
import Avatar from "../ui/Avatar";

const ProfileSettings = () => {
    const { isLoadingSettings, userSettings, updateUserSettings} = useSettings();
    const [userSettingsDTO, setUserSettingsDTO] = useState<UserSettingsDTO>(userSettings!);

    useEffect(() => {
        if (!isLoadingSettings){
            setUserSettingsDTO(userSettings!);
        }
      }, [userSettings, isLoadingSettings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userSettingsDTO) {
          updateUserSettings(userSettingsDTO); 
        }
      };

    if(isLoadingSettings){
        <div>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }

    if (!userSettingsDTO || !userSettings) {
        return <p>Error loading settings.</p>;
    }

    return (
        <form name="profileSettingsForm" className="fieldset w-md bg-base-100 border border-base-300 p-4 rounded-box">
            <div className="flex items-center gap-8">
                <div className="avatar">
                <Avatar size="14"/>
                </div>
                <UploadProfilePicture/>
            </div>
            <div className="divider w-full"/>
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
            <button onClick={handleSubmit} type="submit" disabled={isLoadingSettings} className="btn btn-neutral">
                {isLoadingSettings ? "Updating..." : "Save Changes"}
            </button>
        </form>
    )
}

export default ProfileSettings;