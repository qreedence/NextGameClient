import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SeeAllGames from "@/components/games/SeeAllGames";
import useGetAllHighestRatedGamesForYear from "@/hooks/games/useGetAllHighestRatedGamesForYear";

const GamesHighestRated = () => {
  const { year: yearString } = useParams<{ year: string }>();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [year, setYear] = useState<number>(2025);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      setPage(isNaN(parsedPage) ? 1 : parsedPage);
    }
  }, [searchParams]);

  useEffect(() => {
    if (yearString) {
      const parsedYear = parseInt(yearString, 10);
      if (!isNaN(parsedYear)) {
        setYear(parsedYear);
      }
    }
  }, [yearString]);

  const { allHighestRatedGamesForYear } = useGetAllHighestRatedGamesForYear({
    year,
    page,
  });

  return (
    <SeeAllGames
      title={`Highest Rated Games for ${year}`}
      games={allHighestRatedGamesForYear}
      currentPage={page}
      totalPages={100}
      baseUrl={`games/top/${year}`}
      showPagination={false}
    />
  );
};

export default GamesHighestRated;
