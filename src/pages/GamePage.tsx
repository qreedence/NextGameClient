import GenreTag from "@/components/games/GenreTag";
import PlatformTag from "@/components/games/PlatformTag";
import { Button } from "@/components/ui/button";
import useGetGame from "@/hooks/games/useGetGame";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const GamePage = () => {
  const { id } = useParams<{ id: string }>();

  const { game, isPending } = useGetGame(id);

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <PulseLoader color="white" size={12} />
      </div>
    );
  }

  if (game) {
    return (
      <div className="flex justify-start gap-4">
        <div className="flex flex-col">
          <img
            className="min-w-46"
            src={game.coverUrl ? game.coverUrl : "N/A"}
          />
          <div className="flex gap-2">
            <Button>Hej</Button>
            <Button>Hej</Button>
            <Button>Hej</Button>
            <Button>Hej</Button>
          </div>
          <div className="flex flex-col">
            {game.firstReleaseDate && (
              <div className="flex justify-between">
                <p>Release Date</p>
                <p>
                  {new Date(game.firstReleaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
            <ul className="flex flex-row flex-wrap gap-2">
              {game.platforms?.map((platform) => (
                <li className="text-right" key={platform}>
                  <PlatformTag platform={platform} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-black text-3xl w-full">{game.name}</h1>
          <p>{game.summary}</p>
          <ul className="flex flex-row flex-wrap gap-2">
            {game.genres?.map((genre) => (
              <li className="text-right" key={genre}>
                <GenreTag genre={genre} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default GamePage;
