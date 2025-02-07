import { LogOut } from "lucide-react";
import { AuthService } from "../../apiclient/services/AuthService";
import { useStore } from "../../stores/useStore";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
    const {checkAuthentication} = useStore();
    const navigate = useNavigate();
    const handleClick = async () => {
        await AuthService.logoutUser();
        checkAuthentication();
        navigate("/");
    }

    return (
        <button onClick={handleClick} className="font-bold text-lg text-right flex justify-center items-end"><LogOut />Log out</button>
    )
}

export default LogoutComponent;