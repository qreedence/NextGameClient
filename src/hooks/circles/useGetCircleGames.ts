import { CircleService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

interface GetCircleGamesProps {
  circleId: string;
}

const useGetCircleGames = ({ circleId }: GetCircleGamesProps) => {
  const { data: circleGames, isPending } = useQuery({
    queryKey: ["circleGames", circleId],
    queryFn: async () => {
      return await CircleService.getCircleGames(circleId);
    },
  });

  return { circleGames, isPending };
};

export default useGetCircleGames;
