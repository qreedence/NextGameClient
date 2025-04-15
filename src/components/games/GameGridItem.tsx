import { GameSearchResultDTO } from "@/apiclient";
import { Link } from "react-router-dom";

interface GameGridItemProps {
  game: GameSearchResultDTO;
}

const GameGridItem = ({ game }: GameGridItemProps) => {
  if (!game) {
    return null;
  }

  if (game.name) {
    return (
      <div className="flex flex-col items-center ">
        <Link to={`/game/${game.id}`}>
          <div className="aspect-[3/4] max-h-72">
            <img
              className="rounded-sm border-2 border-background hover:border-foreground object-cover w-full h-full"
              src={
                game.coverUrl
                  ? game.coverUrl
                  : "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"
              }
              alt={game.name}
            />
          </div>
        </Link>
        <p className="font-semibold text-xl">{game.name}</p>
      </div>
    );
  }
};

export default GameGridItem;
