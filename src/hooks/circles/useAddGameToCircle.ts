import { AddGameToCircleRequestDTO, GameSuggestionDTO } from "@/apiclient";
import { CircleService } from "@/apiclient/services/CircleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddGameToCircleProps {
  circleId: string;
}

const useAddGameToCircle = ({ circleId }: AddGameToCircleProps) => {
  const queryClient = useQueryClient();

  const { mutate: addGameToCircle } = useMutation({
    mutationFn: async (requestDTO: AddGameToCircleRequestDTO) => {
      await CircleService.addGame(requestDTO);
    },
    onMutate: async (requestDTO: AddGameToCircleRequestDTO) => {
      await queryClient.cancelQueries({
        queryKey: ["suggestedGames", circleId],
      });

      const previousSuggestedGames = queryClient.getQueryData<
        GameSuggestionDTO[]
      >(["suggestedGames", circleId]);

      queryClient.setQueryData<GameSuggestionDTO[]>(
        ["suggestedGames", circleId],
        (old) => old?.filter((game) => game.gameId !== requestDTO.gameId) ?? []
      );

      return { previousSuggestedGames };
    },
    onError: (err, requestDTO, context) => {
      console.error(err.message, requestDTO.gameName);
      if (context?.previousSuggestedGames) {
        queryClient.setQueryData(
          ["suggestedGames", circleId],
          context.previousSuggestedGames
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestedGames", circleId] });
      queryClient.invalidateQueries({ queryKey: ["circleGames", circleId] });
    },
  });

  return { addGameToCircle };
};

export default useAddGameToCircle;
