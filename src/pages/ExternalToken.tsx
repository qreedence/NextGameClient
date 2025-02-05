import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthService } from "../apiclient";

const ExternalToken = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        const handleLogin = async () => {
            if (token) {
                await AuthService.externalAuthComplete(token);
                window.location.replace("https://localhost:5173/");
            }
        };
        handleLogin();
    },[token]);

    return (
        <div>
        </div>
    )
}

export default ExternalToken;