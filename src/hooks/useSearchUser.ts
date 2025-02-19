import { UserService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

const useSearchUser = (userName: string) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["userSearchResult", userName],
    queryFn: async () => {
      return UserService.searchUsers(userName);
    },
    enabled: userName.length > 0,
  });

  return {
    data,
    isPending,
    isSuccess,
  };
};

export default useSearchUser;
