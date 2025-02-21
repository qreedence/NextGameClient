import { Bell } from "lucide-react";

interface NotificationsIconProps {
  amount: number;
}

const NotificationsIcon = ({ amount }: NotificationsIconProps) => {
  return (
    <>
      <Bell className="scale-125" />
      {amount > 0 && (
        <div className="absolute top-2 right-1 transform translate-x-1/4 -translate-y-1/4 bg-destructive text-white rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center">
          {amount}
        </div>
      )}
    </>
  );
};

export default NotificationsIcon;
