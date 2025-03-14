import { GameService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

const useSearchGame = (searchTerm: string) => {
  const { data: games, isPending } = useQuery({
    queryKey: ["games", searchTerm],
    queryFn: async () => {
      return GameService.getApiGameSearch(searchTerm);
    },
    enabled: searchTerm.length > 0,
  });

  return { games, isPending };
};

export default useSearchGame;
