import { GameService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

const useGetGame = (id: string | undefined) => {
  const { data: game, isPending } = useQuery({
    queryKey: ["game", id],
    queryFn: async () => {
      if (id) {
        return await GameService.getById(id);
      }
    },
  });

  return { game, isPending };
};

export default useGetGame;
