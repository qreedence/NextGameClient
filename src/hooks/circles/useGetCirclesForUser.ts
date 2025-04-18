import { CircleService } from "@/apiclient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../useAuth";

const useGetCirclesForUser = () => {
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const userName = userProfile?.userName;

  const { data: circles, isPending } = useQuery({
    queryKey: ["circles", userName],
    queryFn: async () => {
      return CircleService.getCirclesByUser();
    },
    enabled: isAuthenticated,
  });

  const invalidateCircles = () => {
    queryClient.invalidateQueries({ queryKey: ["circles", userName] });
    if (circles !== undefined) {
      circles.forEach((circle) => {
        queryClient.invalidateQueries({ queryKey: ["circle", circle.id] });
        queryClient.refetchQueries({
          queryKey: ["circleInvitation", circle.id],
        });
      });
    }
  };

  return { circles, isPending, invalidateCircles };
};

export default useGetCirclesForUser;
