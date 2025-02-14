import { Link } from "react-router-dom";
import LogoutComponent from "../auth/LogoutComponent";
import { Settings } from "lucide-react";
import useAuth from "../../services/useAuth";
import Avatar from "./Avatar";

const NavBarDropdown = () => {
const {userProfile} = useAuth();

    return (
        <div className="dropdown dropdown-end">
            {userProfile?.avatar ? (
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-12">
                    <Avatar size="12"/>
                </div>
            ) : (
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder w-12">
                    <Avatar size="12"/>
                </div>
            )}
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><Link to={"/settings"} className="font-bold text-lg text-right flex justify-center items-end"><Settings />Settings</Link></li>
                <li><LogoutComponent/></li>
            </ul>
    </div> 
    )
}

export default NavBarDropdown;