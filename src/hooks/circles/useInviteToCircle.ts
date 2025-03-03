import { CircleService } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";

interface InviteToCircleProps {
  circleId: string;
  username: string;
}

const useInviteToCircle = () => {
  const {
    mutate: inviteToCircle,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ circleId, username }: InviteToCircleProps) => {
      return await CircleService.inviteToCircle(circleId, username);
    },
  });

  return { inviteToCircle, isPending, isSuccess };
};

export default useInviteToCircle;
