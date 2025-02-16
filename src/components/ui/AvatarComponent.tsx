import useAuth from "@/services/useAuth";
import { useStore } from "../../stores/useStore";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const AvatarComponent = () => {
    const {temporaryProfilePicture} = useStore();
    const {userProfile, isAuthenticated} = useAuth();

    if (temporaryProfilePicture !== null){
        return (
            // <div className={`ring-white ring-offset-black rounded-full ring ring-offset-2 w-${size}`}>
            //     <img src={URL.createObjectURL(temporaryProfilePicture)} />
            // </div>
        <Avatar>
            <AvatarImage src={URL.createObjectURL(temporaryProfilePicture)} />
            <AvatarFallback>{userProfile?.userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        )
    }

    if (isAuthenticated && userProfile){
        return (
            // <div className={`ring-white ring-offset-black rounded-full ring ring-offset-2 w-${size}`}>
            //         <img src={userProfile.avatar} />
            //     </div>
            <Avatar className="border-2 w-12 h-12">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback>{userProfile?.userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        )
    }
    // if (isAuthenticated && !userProfile?.avatar){
    //     return(
    //         <div className={`ring-white ring-offset-black rounded-full ring ring-offset-2 w-${size}`}>
    //             <span className="font-bold text-xl">{userProfile?.userName[0].toUpperCase()}</span>
    //         </div>
    //     )
    // }
}

export default AvatarComponent;