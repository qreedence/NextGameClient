import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const RedirectLoggedIn = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      if (isAuthenticated === true) {
        navigate("/");
      }
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated !== undefined && isAuthenticated === false) {
    return <Outlet />;
  }

  if (isAuthenticated === undefined)
    return (
      <>
        <p>undefined</p>
      </>
    );
};

export default RedirectLoggedIn;
