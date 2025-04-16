import { CircleService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

interface GetSuggestedGamesForCircleProps {
  circleId: string;
}

const useGetSuggestedGamesForCircle = ({
  circleId,
}: GetSuggestedGamesForCircleProps) => {
  const { data: suggestedGames, isPending } = useQuery({
    queryKey: ["suggestedGames", circleId],
    queryFn: async () => {
      return await CircleService.getSuggestedGames(circleId);
    },
  });

  return { suggestedGames, isPending };
};

export default useGetSuggestedGamesForCircle;
