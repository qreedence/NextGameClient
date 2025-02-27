import { UserService } from "@/apiclient/services/UserService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetFriendshipStatus = (otherUserUsername?: string) => {
  const queryClient = useQueryClient();

  const { data: friendshipStatus, isPending } = useQuery({
    queryKey: ["friendshipStatus", otherUserUsername],
    queryFn: async () => {
      return UserService.getFriendshipStatus(otherUserUsername);
    },
    enabled: !!otherUserUsername,
  });

  const invalidateGetFriendshipStatus = (username: string) => {
    queryClient.invalidateQueries({ queryKey: ["friendshipStatus", username] });
  };

  return { friendshipStatus, isPending, invalidateGetFriendshipStatus };
};

export default useGetFriendshipStatus;
