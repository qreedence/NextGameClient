import { Link } from "react-router-dom";
import LogoutComponent from "../auth/LogoutComponent";
import { CircleDashed, Moon, Settings, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import AvatarComponent from "./AvatarComponent";
import { ModeToggle } from "./mode-toggle";

const NavBarDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarComponent size="size-12" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 mt-1 bg-background text-foreground"
        align="end"
      >
        <DropdownMenuItem asChild>
          <Link
            to={"/circles"}
            className="text-right flex justify-start gap-2 w-full"
          >
            <CircleDashed className="w-5" />
            Circles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to={"/friends"}
            className="text-right flex justify-start gap-2 w-full"
          >
            <Users className="w-5" />
            Friends
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to={"/settings"}
            className="text-right flex justify-start gap-2 w-full"
          >
            <Settings className="w-5" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="text-right flex justify-start gap-2 w-full">
            <Moon className="w-5" />
            Dark Mode
          </div>
          <ModeToggle variant="switch" />
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
