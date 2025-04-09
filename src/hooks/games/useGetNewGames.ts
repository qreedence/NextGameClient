import { GameService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

const useGetNewGames = () => {
  const { data: newGames, isPending } = useQuery({
    queryKey: ["newGames"],
    queryFn: async () => {
      return await GameService.new();
    },
  });

  return { newGames, isPending };
};

export default useGetNewGames;
