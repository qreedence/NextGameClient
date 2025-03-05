import { CircleService } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";
import useFindFriendsToInviteToCircle from "./useFindFriendsToInviteToCircle";

interface InviteToCircleProps {
  circleId: string;
  username: string;
}

const useInviteToCircle = ({ circleId, username }: InviteToCircleProps) => {
  const { invalidateFriendSearch } = useFindFriendsToInviteToCircle({
    circleId,
    userName: username,
  });

  const {
    mutate: inviteToCircle,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ circleId, username }: InviteToCircleProps) => {
      return await CircleService.inviteToCircle(circleId, username);
    },
    onSuccess: async () => {
      invalidateFriendSearch();
    },
  });

  return { inviteToCircle, isPending, isSuccess };
};

export default useInviteToCircle;
