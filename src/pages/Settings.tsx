// import AccountSettings from "../components/settings/AccountSettings";
import ChangePassword from "../components/settings/ChangePassword";
// import SetSocialAccounts from "../components/settings/SetSocialAccounts";
import ProfileSettings from "../components/settings/ProfileSettings";
import { useStore } from "../stores/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Settings = () => {
    const {isAuthenticated, userProfile} = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/login");
        }
    })

    if(!userProfile){
        return(
            <div className="flex w-full items-center justify-center py-20">
                <span className="loading loading-ring loading-md"></span>
            </div>
        )
    }

        return (
            <div className="tabs tabs-border">

                <input type="radio" name="tabs" className="tab" aria-label="Profile Settings"/>
                <div className="tab-content border-base-300 bg-base-100 p-10">
                   <ProfileSettings/>
                </div>
    
                {/* <input type="radio" name="tabs" className="tab" aria-label="Account Settings"/>
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <AccountSettings/>
                </div>
    
                <input type="radio" name="tabs" className="tab" aria-label="Set Social Accounts"/>
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <SetSocialAccounts/>
                </div> */}
    
    
                <input type="radio" name="tabs" className="tab" aria-label={userProfile.hasPassword ? "Change Password" : "Set Password"}/>
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <ChangePassword/>
                </div>
            </div>
        )
    }

export default Settings;