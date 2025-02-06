import { Link } from "react-router-dom";
import LogoutComponent from "../auth/LogoutComponent";
import { Settings } from "lucide-react";

const NavBarDropdown = () => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-12">
                <div className="ring-white ring-offset-black rounded-full ring ring-offset-2">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
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