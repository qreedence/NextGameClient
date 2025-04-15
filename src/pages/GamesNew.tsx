import useGetAllNew from "@/hooks/games/useGetAllNew";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SeeAllGames from "@/components/games/SeeAllGames";

const GamesNew = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      setPage(isNaN(parsedPage) ? 1 : parsedPage);
    }
  }, [searchParams]);

  const { allNewGames } = useGetAllNew({ page });

  return (
    <SeeAllGames
      title="New Games"
      games={allNewGames}
      currentPage={page}
      totalPages={100}
      baseUrl={"games/new"}
      showPagination={true}
    />
  );
};

export default GamesNew;
