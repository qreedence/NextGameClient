import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthService } from "../apiclient";
import { useStore } from "../stores/useStore";

const ExternalToken = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const {isAuthenticated, checkAuthentication} = useStore();

    useEffect(() => {
        const handleLogin = async () => {
            if (token) {
                await AuthService.externalAuthComplete(token);
                await checkAuthentication();
                if (isAuthenticated){
                    window.location.replace("https://localhost:5173/");
                }
            }
        };
        handleLogin();
    },[token, isAuthenticated, checkAuthentication]);

    return (
        <div>
        </div>
    )
}

export default ExternalToken;