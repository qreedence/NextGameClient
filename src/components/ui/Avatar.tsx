import { Link } from "react-router-dom";
import { useStore } from "../../stores/useStore";

const Avatar = () => {
    const {isAuthenticated, userProfile} = useStore();
    if (isAuthenticated && userProfile?.avatar){
        return (
            <Link className="btn btn-ghost btn-circle avatar w-12" to={"/"}>
                <div className="ring-white ring-offset-black rounded-full ring ring-offset-2">
                    <img src={userProfile.avatar} />
                </div>
            </Link>
        )
    }
    if (isAuthenticated && !userProfile?.avatar){
        return(
            <Link tabIndex={0} role="button" className="avatar avatar-placeholder w-12" to={"/"}>
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span className="font-bold text-xl">{userProfile?.userName[0].toUpperCase()}</span>
                </div>
            </Link>
        )
    }
}

export default Avatar;