import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AddGameToCircleButton from "./AddGameToCircleButton";

interface CircleGameOptionsDropdownProps {
  circleId: string;
  gameId: number;
  gameName: string;
  gameCoverUrl: string;
  players: Array<string>;
  suggestedBy: string;
}

const CircleGameOptionsDropdown = ({
  circleId,
  gameId,
  gameName,
  gameCoverUrl,
  players,
  suggestedBy,
}: CircleGameOptionsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full size-9">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-1 bg-background text-foreground"
        align="end"
      >
        {/* CurrentlyPlaying = 1,
              InRotation = 2,
              Backlog = 3,
              Played = 4,
              Finished = 5,
              Abandoned = 6, */}

        <DropdownMenuItem className="">
          <AddGameToCircleButton
            requestDTO={{
              circleId: circleId,
              gameId: gameId,
              gameName: gameName,
              gameCoverUrl: gameCoverUrl,
              players: players,
              gameStatus: 1,
              suggestedBy: suggestedBy,
            }}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="">
          <AddGameToCircleButton
            requestDTO={{
              circleId: circleId,
              gameId: gameId,
              gameName: gameName,
              gameCoverUrl: gameCoverUrl,
              players: players,
              gameStatus: 2,
              suggestedBy: suggestedBy,
            }}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="">
          <AddGameToCircleButton
            requestDTO={{
              circleId: circleId,
              gameId: gameId,
              gameName: gameName,
              gameCoverUrl: gameCoverUrl,
              players: players,
              gameStatus: 3,
              suggestedBy: suggestedBy,
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CircleGameOptionsDropdown;
