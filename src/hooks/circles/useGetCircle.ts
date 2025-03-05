import { CircleService } from "@/apiclient";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetCircle = (circleId: string) => {
  const queryClient = useQueryClient();
  const { data: circle, isPending } = useQuery({
    queryKey: ["circle", circleId],
    queryFn: async () => {
      return CircleService.getCircleById(circleId);
    },
  });

  const invalidateCircle = () => {
    queryClient.invalidateQueries({ queryKey: ["circle", circleId] });
  };

  return { circle, isPending, invalidateCircle };
};

export default useGetCircle;
