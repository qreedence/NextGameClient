import { NotificationDTO } from "@/apiclient/models/NotificationDTO";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import useMarkNotificationAsSeen from "@/hooks/useMarkNotificationAsSeen";

interface NotificationProps {
  notification: NotificationDTO;
}

const Notification = ({ notification }: NotificationProps) => {
  const navigate = useNavigate();
  const { markNotificationAsSeen } = useMarkNotificationAsSeen();

  const handleOnClick = () => {
    if (notification.actionUrl && notification.id) {
      if (notification.seen === false) {
        markNotificationAsSeen(notification.id);
      }
      navigate(notification.actionUrl);
    }
  };

  return (
    <div
      onClick={handleOnClick}
      className="flex items-center gap-4 py-2 hover:cursor-pointer"
    >
      <Avatar className="border-2 border-white">
        <AvatarImage src={notification.avatarUrl!} />
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
