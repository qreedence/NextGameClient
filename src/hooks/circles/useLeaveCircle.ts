import { CircleService } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";
import useGetCircle from "./useGetCircle";

interface LeaveCircleProps {
  circleId: string;
}

const useLeaveCircle = ({ circleId }: LeaveCircleProps) => {
  const { invalidateCircle } = useGetCircle(circleId);
  const { mutate: leaveCircle, isPending } = useMutation({
    mutationFn: async (circleId: string) => {
      return await CircleService.leaveCircle(circleId);
    },
    onSuccess: async () => {
      invalidateCircle();
    },
  });

  return { leaveCircle, isPending };
};

export default useLeaveCircle;
