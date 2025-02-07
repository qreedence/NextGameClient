import { Link } from "react-router-dom";
import { useStore } from "../../stores/useStore";
import NavBarDropdown from "./NavBarDropdown";

const NavBar = () => {
    const {isAuthenticated, userProfile} = useStore();
    return (
    <div className="navbar bg-base-100 shadow-sm py-4">
        <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">Home</Link>
        </div>
        <div className="flex gap-2">
            
        {userProfile && isAuthenticated ? (
            <div className="flex items-center gap-4">
                <p className="text-lg font-semibold">{userProfile.userName}</p>
                <NavBarDropdown/>
            </div>
        ) : <Link to="/login" className="btn btn-neutral text-xl font-bold">Log in</Link>}
        </div>
    </div>
    )};

export default NavBar;