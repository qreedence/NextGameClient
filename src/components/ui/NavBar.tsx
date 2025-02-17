import { Link } from "react-router-dom";
import NavBarDropdown from "./NavBarDropdown";
import useAuth from "../../hooks/useAuth";
import { ModeToggle } from "./mode-toggle";

const NavBar = () => {
  const { isAuthenticated, userProfile } = useAuth();

  if (isAuthenticated !== undefined)
    return (
      <div className="flex shadow-sm py-4 px-8 items-center mb-8">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            Home
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <ModeToggle />
          {isAuthenticated && userProfile ? (
            <div className="flex items-center gap-4">
              <NavBarDropdown />
            </div>
          ) : (
            <Link to="/login" className="btn btn-neutral text-xl font-bold">
              Log in
            </Link>
          )}
        </div>
      </div>
    );
};

export default NavBar;
