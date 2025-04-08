import { GameSearchResultDTO } from "@/apiclient";
import { Link } from "react-router-dom";

interface GameGridItemProps {
  game: GameSearchResultDTO;
}

const GameGridItem = ({ game }: GameGridItemProps) => {
  if (game.coverUrl && game.name) {
    return (
      <div className="flex flex-col items-center ">
        <Link to={`/game/${game.id}`}>
          <img
            className="rounded-sm border-2 border-background hover:border-foreground"
            src={game.coverUrl}
            alt={game.name}
          />
        </Link>
        <p className="font-semibold text-xl">{game.name}</p>
      </div>
    );
  }
};

export default GameGridItem;
