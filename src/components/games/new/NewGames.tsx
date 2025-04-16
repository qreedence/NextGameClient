import useGetNewGames from "@/hooks/games/useGetNewGames";
import GameGrid from "../GameGrid";

const NewGames = () => {
  const { newGames } = useGetNewGames();

  if (newGames) {
    return (
      <GameGrid games={newGames} title={"New Games"} seeAllUrl={"/games/new"} />
    );
  }
};

export default NewGames;
