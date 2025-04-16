import { CircleService } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";

interface SuggestGameToCircleProps {
  gameId: number;
}

const useSuggestGameToCircle = ({ gameId }: SuggestGameToCircleProps) => {
  const { mutate: suggestGame, isPending } = useMutation({
    mutationFn: async (circleId: string) => {
      return await CircleService.suggestGame(circleId, gameId);
    },
  });

  return { suggestGame, isPending };
};

export default useSuggestGameToCircle;
