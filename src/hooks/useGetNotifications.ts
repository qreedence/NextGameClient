import { NotificationService } from "@/apiclient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useGetNotifications = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, userProfile } = useAuth();

  const userName = userProfile?.userName;

  const { data: notifications, isPending } = useQuery({
    queryKey: ["notifications", userName],
    queryFn: async () => {
      return NotificationService.getNotifications();
    },
    enabled: isAuthenticated === true,
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
