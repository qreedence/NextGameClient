import { FriendRequestResponse, UserService } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";

const useFriendRequestResponse = () => {
  const {
    mutate: friendRequestResponse,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (response: FriendRequestResponse) => {
      return UserService.friendRequestResponse(response);
    },
    onSuccess: () => {},
    onError: () => {},
  });

  return { friendRequestResponse, isPending, isSuccess };
};

export default useFriendRequestResponse;
