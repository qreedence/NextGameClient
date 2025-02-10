import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../services/useAuth";

const LogoutComponent = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    
    const handleClick = async () => {
        logout();
        navigate("/");
    }

    return (
        <button onClick={handleClick} className="font-bold text-lg text-right flex justify-center items-end"><LogOut />Log out</button>
    )
}

export default LogoutComponent;