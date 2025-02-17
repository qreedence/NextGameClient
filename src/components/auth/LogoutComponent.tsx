import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LogoutComponent = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleClick = async () => {
    logout();
    navigate("/");
  };

  return (
    <button
      onClick={handleClick}
      className="text-right flex justify-start gap-2 w-full hover:cursor-pointer"
    >
      <LogOut className="w-5" />
      Log out
    </button>
  );
};

export default LogoutComponent;
