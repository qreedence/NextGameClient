import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const RedirectLoggedOut = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      if (!isAuthenticated === true) {
        navigate("/login");
      }
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated !== undefined && isAuthenticated) {
    return <Outlet />;
  }
  return <></>;
};

export default RedirectLoggedOut;
