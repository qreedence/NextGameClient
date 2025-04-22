import { CircleService, GameStatus } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";

interface ChangeGameStatusProps {
  circleGameId: number;
}

const useChangeGameStatus = ({ circleGameId }: ChangeGameStatusProps) => {
  const { mutate: changeGameStatus, isPending } = useMutation({
    mutationFn: async (gameStatus: GameStatus) => {
      CircleService.changeGameStatus(circleGameId, gameStatus);
    },
  });

  return { changeGameStatus, isPending };
};

export default useChangeGameStatus;
