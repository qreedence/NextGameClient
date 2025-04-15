import { GameService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

interface useGetAllHighestRatedGamesForYearProps {
  year: number;
  page: number;
}

const useGetAllHighestRatedGamesForYear = ({
  year,
  page,
}: useGetAllHighestRatedGamesForYearProps) => {
  const { data: allHighestRatedGamesForYear, isPending } = useQuery({
    queryKey: ["allTopRatedGames", year],
    queryFn: async () => {
      return await GameService.getAllHighestRated(year, page);
    },
  });

  return { allHighestRatedGamesForYear, isPending };
};

export default useGetAllHighestRatedGamesForYear;
