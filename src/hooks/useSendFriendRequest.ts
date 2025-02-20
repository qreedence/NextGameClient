import { UserService } from "@/apiclient/services/UserService";
import { useMutation } from "@tanstack/react-query";

const useSendFriendRequest = () => {
  const {
    mutate: sendFriendRequest,
    error,
    isPending,
  } = useMutation<void, Error, string>({
    mutationFn: async (username: string) => {
      UserService.addFriend(username);
    },
  });

  return { sendFriendRequest, error, isPending };
};

export default useSendFriendRequest;
