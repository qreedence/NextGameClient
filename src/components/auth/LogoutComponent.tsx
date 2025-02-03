import { AuthService } from "../../apiclient/services/AuthService";
import { useStore } from "../../stores/useStore";

const LogoutComponent = () => {
    const {checkAuthentication} = useStore();
    const handleClick = async () => {
        await AuthService.logoutUser();
        checkAuthentication();
    }

    return (
        <button onClick={handleClick} className="btn btn-neutral font-bold text-xl">Log out</button>
    )
}

export default LogoutComponent;