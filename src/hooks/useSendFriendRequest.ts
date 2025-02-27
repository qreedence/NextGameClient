import { UserService } from "@/apiclient/services/UserService";
import { useMutation } from "@tanstack/react-query";

const useSendFriendRequest = () => {
  const {
    mutate: sendFriendRequest,
    error,
    isPending,
    isSuccess,
  } = useMutation<void, Error, string>({
    mutationFn: async (username: string) => {
      return await UserService.addFriend(username);
    },
  });

  return { sendFriendRequest, error, isPending, isSuccess };
};

export default useSendFriendRequest;
