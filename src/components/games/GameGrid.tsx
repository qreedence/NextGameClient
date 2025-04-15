import { GameSearchResultDTO } from "@/apiclient";
import GameGridItem from "./GameGridItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

interface GameGridProps {
  title: string;
  games: GameSearchResultDTO[];
  seeAllUrl: string;
}
const GameGrid = ({ games, title, seeAllUrl }: GameGridProps) => {
  if (games && games.length > 0) {
    return (
      <div>
        <div className="flex items-end justify-between">
          <h1 className="font-bold text-3xl">{title}</h1>
          <Link to={seeAllUrl} className="underline underline-offset-3">
            See All
          </Link>
        </div>
        <Separator className="my-4 h-0.5" />
        <Carousel
          opts={{
            align: "start",
          }}
          className="my-4"
        >
          <CarouselContent>
            {games.map((game) => (
              <CarouselItem className="basis-1/5">
                <GameGridItem key={`${game.id}-${title}`} game={game} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
};

export default GameGrid;
