import { CircleService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

const useGetCirclesForUser = () => {
  const { data: circles, isPending } = useQuery({
    queryKey: ["circles"],
    queryFn: async () => {
      return CircleService.getCirclesByUser();
    },
  });

  return { circles, isPending };
};

export default useGetCirclesForUser;
