import { NotificationService } from "@/apiclient";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetNotifications = () => {
  const queryClient = useQueryClient();
  const { data: notifications, isPending } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      return NotificationService.getNotifications();
    },
  });

  const unseenNotifications = notifications?.filter(
    (notification) => !notification.seen
  ).length;

  const invalidateNotifications = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  return {
    notifications,
    isPending,
    unseenNotifications,
    invalidateNotifications,
  };
};

export default useGetNotifications;
