import GameGrid from "../GameGrid";
import useGetHighestRatedGamesForYear from "@/hooks/games/useGetHighestRatedGamesForYear";

const NewGames = () => {
  const { highestRatedGames } = useGetHighestRatedGamesForYear(2025);

  if (highestRatedGames) {
    return (
      <div>
        <GameGrid
          games={highestRatedGames}
          title={"Highest Rated of 2025"}
          seeAllUrl={"/games/top/2025"}
        />
      </div>
    );
  }
};

export default NewGames;
