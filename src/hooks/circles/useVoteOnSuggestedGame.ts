import { CircleService, GameVoteStatus } from "@/apiclient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useVoteOnSuggestedGame = () => {
  const queryClient = useQueryClient();

  const { mutate: voteOnSuggestedGame, isPending } = useMutation({
    mutationFn: async ({
      gameSuggestionId,
      gameVoteStatus,
    }: {
      gameSuggestionId: number;
      gameVoteStatus: GameVoteStatus;
    }) => {
      return await CircleService.voteForGame(gameSuggestionId, gameVoteStatus);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "suggestedGames",
      });
    },
  });

  return { voteOnSuggestedGame, isPending };
};

export default useVoteOnSuggestedGame;
