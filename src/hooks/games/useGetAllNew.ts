import { GameService } from "@/apiclient";
import { useQuery } from "@tanstack/react-query";

interface useGetAllNewProps {
  page: number;
}

const useGetAllNew = ({ page }: useGetAllNewProps) => {
  const { data: allNewGames, isPending } = useQuery({
    queryKey: ["allNewGames", page],
    queryFn: async () => {
      return await GameService.getAllNew(page);
    },
  });

  return { allNewGames, isPending };
};

export default useGetAllNew;
