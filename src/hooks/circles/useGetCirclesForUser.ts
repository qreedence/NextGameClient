import { CircleService } from "@/apiclient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../useAuth";

const useGetCirclesForUser = () => {
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();

  const userName = userProfile?.userName;

  const { data: circles, isPending } = useQuery({
    queryKey: ["circles", userName],
    queryFn: async () => {
      return CircleService.getCirclesByUser();
    },
  });

  const invalidateCircles = () => {
    queryClient.invalidateQueries({ queryKey: ["circles", userName] });
  };

  return { circles, isPending, invalidateCircles };
};

export default useGetCirclesForUser;
