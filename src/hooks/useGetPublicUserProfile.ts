import { UserService } from "@/apiclient/services/UserService";
import { useQuery } from "@tanstack/react-query";

const useGetPublicUserProfile = (username: string | undefined) => {
  const {
    data: publicUserProfile,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["publicUserProfile", username],
    queryFn: async () => {
      if (!username) {
        console.error("Username is required");
        return;
      }
      return UserService.findByUsername(username);
    },
    enabled: !!username,
  });
  return { publicUserProfile, isPending, isError };
};

export default useGetPublicUserProfile;
