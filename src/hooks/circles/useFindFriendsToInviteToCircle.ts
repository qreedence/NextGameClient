import { CircleService } from "@/apiclient";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface FindFriendsToInviteProps {
  circleId: string;
  userName: string;
}

const useFindFriendsToInviteToCircle = ({
  circleId,
  userName,
}: FindFriendsToInviteProps) => {
  const queryClient = useQueryClient();

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["friendSearchResult", circleId, userName],
    queryFn: async () => {
      return await CircleService.findFriendsToInvite(circleId, userName);
    },
    enabled: circleId.length > 0 && userName.length > 0,
  });

  const invalidateFriendSearch = () => {
    queryClient.invalidateQueries({
      queryKey: ["friendSearchResult", circleId, userName],
    });
  };

  return {
    data,
    isPending,
    isSuccess,
    invalidateFriendSearch,
  };
};

export default useFindFriendsToInviteToCircle;
