import { NotificationDTO } from "@/apiclient/models/NotificationDTO";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NotificationProps {
  notification: NotificationDTO;
}

const Notification = ({ notification }: NotificationProps) => {
  return (
    <div className="flex items-center gap-4 py-2">
      <Avatar className="border-2 border-white">
        <AvatarImage src={""} />
        <AvatarFallback>Placeholder</AvatarFallback>
      </Avatar>
      <p>{notification.data}</p>
      {!notification.seen && (
        <div className="w-2 h-2 rounded-full bg-blue-500 ml-2"></div>
      )}
    </div>
  );
};

export default Notification;
