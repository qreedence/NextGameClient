import HighestRatedGames from "@/components/games/highestrated/HighestRatedGames";
import NewGames from "@/components/games/new/NewGames";

const Home = () => {
  return (
    <div className="py-20">
      <NewGames />
      <HighestRatedGames />
    </div>
  );
};

export default Home;
