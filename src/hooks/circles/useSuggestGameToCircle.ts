import { CircleService } from "@/apiclient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SuggestGameToCircleProps {
  gameId: number;
  gameName: string;
  gameCoverUrl: string;
}

const useSuggestGameToCircle = ({
  gameId,
  gameName,
  gameCoverUrl,
}: SuggestGameToCircleProps) => {
  const queryClient = useQueryClient();

  const { mutate: suggestGame, isPending } = useMutation({
    mutationFn: async (circleId: string) => {
      return await CircleService.suggestGame(
        circleId,
        gameId,
        gameName,
        gameCoverUrl
      );
    },
    onSuccess: async (circleId) => {
      queryClient.invalidateQueries({ queryKey: ["suggestedGames", circleId] });
    },
  });

  return { suggestGame, isPending };
};

export default useSuggestGameToCircle;
