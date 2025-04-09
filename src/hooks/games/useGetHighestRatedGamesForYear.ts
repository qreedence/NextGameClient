import { GameService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

const useGetHighestRatedGamesForYear = (year: number) => {
  const { data: highestRatedGames, isPending } = useQuery({
    queryKey: ["topRatedGames", year],
    queryFn: async () => {
      return await GameService.highestRated(year);
    },
  });

  return { highestRatedGames, isPending };
};

export default useGetHighestRatedGamesForYear;
