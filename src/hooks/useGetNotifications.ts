import { NotificationService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

const useGetNotifications = () => {
  const { data: notifications, isPending } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      return NotificationService.getNotifications();
    },
  });

  const unseenNotifications = notifications?.filter(
    (notification) => !notification.seen
  ).length;

  return { notifications, isPending, unseenNotifications };
};

export default useGetNotifications;
