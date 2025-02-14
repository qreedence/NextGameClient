import useAuth from "@/services/useAuth";
import { useStore } from "../../stores/useStore";

interface AvatarProps{
    size: string,
}

const Avatar = ({size}:AvatarProps) => {
    const {temporaryProfilePicture} = useStore();
    const {userProfile, isAuthenticated} = useAuth();

    if (temporaryProfilePicture !== null){
        return (
            <div className={`ring-white ring-offset-black rounded-full ring ring-offset-2 w-${size}`}>
                <img src={URL.createObjectURL(temporaryProfilePicture)} />
            </div>
        )
    }

    if (isAuthenticated && userProfile?.avatar){
        return (
            <div className={`ring-white ring-offset-black rounded-full ring ring-offset-2 w-${size}`}>
                    <img src={userProfile.avatar} />
                </div>
        )
    }
    if (isAuthenticated && !userProfile?.avatar){
        return(
            <div className={`ring-white ring-offset-black rounded-full ring ring-offset-2 w-${size}`}>
                <span className="font-bold text-xl">{userProfile?.userName[0].toUpperCase()}</span>
            </div>
        )
    }
}

export default Avatar;