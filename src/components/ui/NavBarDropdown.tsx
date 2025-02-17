import { Link } from "react-router-dom";
import LogoutComponent from "../auth/LogoutComponent";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import AvatarComponent from "./AvatarComponent";

const NavBarDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarComponent size={12} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 mt-1 bg-background text-foreground"
        align="end"
      >
        <DropdownMenuItem>
          <Link
            to={"/settings"}
            className="text-right flex justify-start gap-2 w-full"
          >
            <Settings className="w-5" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutComponent />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavBarDropdown;
