import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ExternalToken = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const { isAuthenticated, externalAuthComplete } = useAuth();

  useEffect(() => {
    const handleLogin = async () => {
      if (token) {
        externalAuthComplete(token);
        if (isAuthenticated) {
          navigate("/");
        }
      }
    };
    handleLogin();
  }, [token, isAuthenticated, externalAuthComplete, navigate]);

  return <></>;
};

export default ExternalToken;
