import { Link } from "react-router-dom";
import NavBarDropdown from "./NavBarDropdown";
import useAuth from "../../hooks/useAuth";
import { ModeToggle } from "./mode-toggle";
import NotificationsDropdown from "../notifications/NotificationsDropDown";
import SignalRNotifications from "../notifications/SignalRNotifications";
import GameSearchBar from "../games/search/GameSearchBar";

const NavBar = () => {
  const { isAuthenticated, userProfile } = useAuth();

  if (isAuthenticated !== undefined)
    return (
      <div className="flex shadow-sm py-4 px-8 items-center">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            Home
          </Link>
        </div>
        <div className="mr-2">
          <GameSearchBar />
        </div>
        <div className="flex gap-2 items-center">
          {!isAuthenticated && <ModeToggle variant="button" />}
          {isAuthenticated && userProfile ? (
            <div className="flex items-center gap-4">
              <SignalRNotifications>
                <NotificationsDropdown />
              </SignalRNotifications>
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
