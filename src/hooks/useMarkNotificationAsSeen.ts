import { NotificationService } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";
import useGetNotifications from "./useGetNotifications";

const useMarkNotificationAsSeen = () => {
  const { invalidateNotifications } = useGetNotifications();
  const { mutate: markNotificationAsSeen } = useMutation({
    mutationFn: async (id: string) => {
      return NotificationService.markNotificationAsSeen(id);
    },
    onSuccess: () => {
      invalidateNotifications();
    },
  });

  return { markNotificationAsSeen };
};

export default useMarkNotificationAsSeen;
