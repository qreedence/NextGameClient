import GameGridItem from "@/components/games/GameGridItem";
import { Separator } from "@/components/ui/separator";
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { IoGrid, IoListSharp } from "react-icons/io5";
import { toast } from "sonner";
import { GameSearchResultDTO } from "@/apiclient";
import { PulseLoader } from "react-spinners";

interface SeeAllGamesProps {
  title: string;
  games: GameSearchResultDTO[] | undefined;
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  showPagination: boolean;
}

const SeeAllGames = ({
  title,
  games,
  currentPage,
  totalPages,
  baseUrl,
  showPagination,
}: SeeAllGamesProps) => {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="font-black text-3xl w-full">{title}</h1>
          <div className="flex gap-1">
            <Button
              onClick={() => {
                toast("Not implemented yet");
              }}
            >
              <IoGrid />
            </Button>
            <Button
              onClick={() => {
                toast("Not implemented yet");
              }}
            >
              <IoListSharp />
            </Button>
          </div>
        </div>
        <Separator className="h-0.5 my-2" />
        {showPagination && (
          <Pagination
            className="my-4"
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={baseUrl}
          />
        )}
      </div>
      <div className="container mx-auto py-8">
        {games === undefined && (
          <div className="flex items-center justify-center h-full text-center">
            <PulseLoader size={12} color="white" />
          </div>
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {games?.map((game) => (
            <GameGridItem key={game.id} game={game} />
          ))}
        </div>
      </div>
      {showPagination && (
        <Pagination
          className="my-4"
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
        />
      )}
    </div>
  );
};

export default SeeAllGames;
