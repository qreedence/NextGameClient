import useGetNotifications from "@/hooks/useGetNotifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NotificationsIcon from "./NotificationsIcon";
import { Button } from "../ui/button";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import NotificationsSubMenu from "./NotificationsSubMenu";
import Notification from "./Notification";

const NotificationsDropdown = () => {
  const { notifications, unseenNotifications } = useGetNotifications();
  if (unseenNotifications !== undefined && notifications !== undefined) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-12 rounded-full relative" variant="ghost">
            <NotificationsIcon amount={unseenNotifications} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-98 min-w-56 mt-1 bg-background text-foreground px-4 py-2"
          align="end"
        >
          <DropdownMenuLabel className="flex items-center justify-between mb-4">
            <h1 className="font-semibold">Notifications</h1>
            <NotificationsSubMenu />
          </DropdownMenuLabel>
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <Notification notification={notification} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default NotificationsDropdown;
