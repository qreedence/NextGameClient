import GenreTag from "@/components/games/GenreTag";
import PlatformTag from "@/components/games/PlatformTag";
import ScreenshotCarousel from "@/components/games/ScreenshotCarousel";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import useGetGame from "@/hooks/games/useGetGame";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import GameLink from "@/components/games/GameLink";
import { BiLoaderCircle } from "react-icons/bi";

const GamePage = () => {
  const { id } = useParams<{ id: string }>();

  const { game, isPending } = useGetGame(id);

  if (isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <PulseLoader color="white" size={12} />
      </div>
    );
  }

  if (game) {
    return (
      <div className="flex flex-col">
        <div className="flex justify-start gap-4">
          <div className="flex flex-col">
            <img
              className="min-w-46 max-w-64 rounded-md border-1 border-foreground mb-3"
              src={game.coverUrl ? game.coverUrl : "N/A"}
            />
            <div className="flex gap-2 w-full justify-between">
              <Button className="w-full">
                <BiLoaderCircle />
              </Button>
              <Button className="w-full">
                <BiLoaderCircle />
              </Button>{" "}
              <Button className="w-full">
                <BiLoaderCircle />
              </Button>{" "}
              <Button className="w-full">
                <BiLoaderCircle />
              </Button>
            </div>
            <div className="flex flex-col"></div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-black text-3xl w-full">{game.name}</h1>
            <ul className="flex flex-row flex-wrap gap-2">
              {game.platforms?.map((platform) => (
                <li className="text-right" key={platform}>
                  <PlatformTag platform={platform} />
                </li>
              ))}
            </ul>
            <p>{game.summary}</p>
            <Table>
              <TableCaption className="sr-only">
                Detailed information.
              </TableCaption>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <p>Release Date</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {new Date(
                        game.firstReleaseDate
                          ? game.firstReleaseDate
                          : Date.now()
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </TableCell>
                </TableRow>
                <TableRow className="py-2">
                  <TableCell>Genre(s):</TableCell>
                  <TableCell className="flex gap-2">
                    {game.genres?.map((genre) => (
                      <GenreTag genre={genre} />
                    ))}
                  </TableCell>
                </TableRow>
                {(game.websites?.official ||
                  game.websites?.steam ||
                  game.websites?.epicGames) && (
                  <TableRow>
                    <TableCell>Links:</TableCell>
                    <TableCell className="flex gap-2">
                      {game.websites?.official && (
                        <GameLink
                          url={game.websites.official}
                          urlType="official"
                          tooltipText={"Official website"}
                        />
                      )}
                      {game.websites?.steam && (
                        <GameLink
                          url={game.websites.steam}
                          urlType="steam"
                          tooltipText={"Steam"}
                        />
                      )}
                      {game.websites?.epicGames && (
                        <GameLink
                          url={game.websites.epicGames}
                          urlType="epicGames"
                          tooltipText={"Epic Games Store"}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {game.screenshots && (
          <ScreenshotCarousel screenshotUrls={game.screenshots} />
        )}
      </div>
    );
  }
};

export default GamePage;
