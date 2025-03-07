import { ApiError, CircleService } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useGetCirclesForUser from "./useGetCirclesForUser";

const useLeaveCircle = () => {
  const { invalidateCircles } = useGetCirclesForUser();
  const { mutate: leaveCircle, isPending } = useMutation({
    mutationFn: async (circleId: string) => {
      return await CircleService.leaveCircle(circleId);
    },
    onSuccess: async () => {
      invalidateCircles();
    },
    onError: (e) => {
      if (e instanceof ApiError) {
        toast(e.body);
      }
    },
  });

  return { leaveCircle, isPending };
};

export default useLeaveCircle;
