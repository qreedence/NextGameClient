import { Link } from "react-router-dom";
import { useStore } from "../../stores/useStore";
import { AuthService } from "../../apiclient";
import { useEffect, useState } from "react";
import NavBarDropdown from "./NavBarDropdown";

const NavBar = () => {
    const {isAuthenticated} = useStore();
    const [name, setName] = useState<string>("");
    const getName = async () => {
        setName(await AuthService.getUserName());
    }

    useEffect(() => {
        getName();
    })

    return (
    <div className="navbar bg-base-100 shadow-sm py-4">
        <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">Home</Link>
        </div>
        <div className="flex gap-2">
            
        {isAuthenticated ? (
            <div className="flex items-center gap-4">
                <p className="text-lg font-semibold">{name}</p>
                <NavBarDropdown/>
            </div>
        ) : <Link to="/login" className="btn btn-neutral text-xl font-bold">Log in</Link>}
        </div>
    </div>
    )};

export default NavBar;