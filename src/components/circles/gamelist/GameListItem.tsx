import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GripVertical } from "lucide-react";
import { CircleGameDTO } from "@/apiclient";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CircleGameDetails from "./CircleGameDetails";

interface SortableGameItemProps {
  game: CircleGameDTO;
}

const GameListItem = ({ game }: SortableGameItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: game.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} className="relative w-full">
      <CardContent className="p-3 flex items-center gap-3">
        <div className="cursor-grab touch-none" {...attributes} {...listeners}>
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="h-16 w-12 rounded overflow-hidden flex-shrink-0">
          <Dialog>
            <DialogTitle className="sr-only">
              Information about this game.
            </DialogTitle>
            <DialogTrigger>
              <img
                src={game.gameCoverUrl || "/placeholder.svg"}
                alt={`${game.gameName} cover`}
                className="h-full w-full object-cover hover:cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full">
              <CircleGameDetails game={game} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-grow">
          <Dialog>
            <DialogTitle className="sr-only">
              Information about this game.
            </DialogTitle>

            <DialogTrigger>
              <h3 className="font-medium text-sm hover:cursor-pointer">
                {game.gameName}
              </h3>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-full">
              <CircleGameDetails game={game} />
            </DialogContent>
          </Dialog>
        </div>

        {game.players && (
          <div className="flex -space-x-2">
            <TooltipProvider>
              {game.players.map((player) => (
                <Tooltip key={player.userId}>
                  <TooltipTrigger asChild>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage
                        src={player.avatar || "/placeholder.svg"}
                        alt={player.username}
                      />
                      <AvatarFallback>
                        {player.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{player.username}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameListItem;
