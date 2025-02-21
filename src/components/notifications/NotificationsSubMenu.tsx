import useGetNotifications from "@/hooks/useGetNotifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Check, Ellipsis } from "lucide-react";
import { toast } from "sonner";

const NotificationsSubMenu = () => {
  const { notifications, unseenNotifications } = useGetNotifications();
  if (unseenNotifications !== undefined && notifications !== undefined) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 rounded-full relative" variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 mt-1 bg-background text-foreground"
          align="end"
        >
          <DropdownMenuItem>
            <Button
              className="text-right flex justify-start gap-2 w-full"
              variant="ghost"
              onClick={() => {
                toast("Not implemented yet!");
              }}
            >
              <Check />
              Mark all as seen
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default NotificationsSubMenu;
