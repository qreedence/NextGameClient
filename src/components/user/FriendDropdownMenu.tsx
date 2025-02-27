import { UserCheck } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UnfriendButton from "./UnfriendButton";

interface FriendDropdownMenuProps {
  username: string;
}

const FriendDropdownMenu = ({ username }: FriendDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <UserCheck />
          Friends
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 mt-1 bg-background text-foreground px-4 py-2"
        align="end"
      >
        <DropdownMenuItem>
          <UnfriendButton username={username} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FriendDropdownMenu;
