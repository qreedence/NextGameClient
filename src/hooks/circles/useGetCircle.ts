import { CircleService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

const useGetCircle = (circleId: string) => {
  const { data: circle, isPending } = useQuery({
    queryKey: ["circle", circleId],
    queryFn: async () => {
      return CircleService.getCircleById(circleId);
    },
  });

  return { circle, isPending };
};

export default useGetCircle;
