import { UserService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

const useGetFriendList = () => {
  const { data: friends, isPending } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      return UserService.getFriends();
    },
  });
  return { friends, isPending };
};

export default useGetFriendList;
