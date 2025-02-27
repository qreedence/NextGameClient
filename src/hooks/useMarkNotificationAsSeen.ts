import { NotificationService } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";
import useGetNotifications from "./useGetNotifications";

const useMarkNotificationAsSeen = () => {
  const { invalidateNotifications } = useGetNotifications();
  const { mutate: markNotificationAsSeen } = useMutation({
    mutationFn: async (id: string) => {
      return await NotificationService.markNotificationAsSeen(id);
    },
    onSuccess: () => {
      invalidateNotifications();
    },
  });

  const { mutate: markAllNotificationsAsSeen } = useMutation({
    mutationFn: async () => {
      return await NotificationService.markAllNotificationsAsSeen();
    },
    onSuccess: () => {
      invalidateNotifications();
    },
  });

  return { markNotificationAsSeen, markAllNotificationsAsSeen };
};

export default useMarkNotificationAsSeen;
