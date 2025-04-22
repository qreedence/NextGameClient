import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  Users,
  Star,
  Heart,
  BookmarkPlus,
  ExternalLink,
  ListPlus,
} from "lucide-react";
import { useState } from "react";
import type { CircleGameDTO } from "@/apiclient";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GameStatusDropdown from "./GameStatusDropdown";

function formatDate(dateString?: string) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isValidStartDate(dateString?: string) {
  if (!dateString) return false;
  const date = new Date(dateString);
  return (
    date.getFullYear() !== 1 || date.getMonth() !== 0 || date.getDate() !== 1
  );
}

interface CircleGameDetailsProps {
  game: CircleGameDTO;
  onRatingChange?: (rating: number) => void;
  onDateSelect?: (date: Date) => void;
}

const CircleGameDetails = ({
  game,
  onRatingChange = () => {},
}: // onDateSelect = () => {},
CircleGameDetailsProps) => {
  // const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  // const handleDateSelect = (date: Date) => {
  //   onDateSelect(date);
  // };

  return (
    <div className="container max-w-4xl py-8">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Game Cover */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-md">
            <img
              src={game.gameCoverUrl || "/placeholder.svg"}
              alt={`${game.gameName} cover`}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {game.gameStatus && game.id && (
                <GameStatusDropdown
                  gameStatus={game.gameStatus}
                  circleGameId={game.id}
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Like</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ListPlus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to List</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <Link to={`/game/${game.gameId}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to Game Page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Rating Stars */}
          <div className="p-3 rounded-md">
            <div className="flex flex-col gap-2">
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 focus:outline-none"
                    onClick={() => handleRatingChange(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        (
                          hoveredRating !== null
                            ? star <= hoveredRating
                            : star <= rating
                        )
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Game Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{game.gameName}</h1>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <span>Suggested by</span>
              <Avatar className="mx-2 h-6 w-6">
                <AvatarImage
                  src={game.suggestedBy?.avatar || ""}
                  alt={game.suggestedBy?.username}
                />
                <AvatarFallback>
                  {game.suggestedBy?.username?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{game.suggestedBy?.username}</span>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {game.players?.map((player) => (
                  <div
                    key={player.userId}
                    className="flex items-center gap-2 rounded-full bg-muted px-3 py-1"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={player.avatar || ""}
                        alt={player.username}
                      />
                      <AvatarFallback>
                        {player.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{player.username}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <CalendarDays className="mr-2 h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Added to Circle:</div>
                  <div className="text-sm">{formatDate(game.dateAdded)}</div>

                  <div className="text-sm font-medium">Started Playing:</div>
                  <div className="text-sm">
                    {" "}
                    {isValidStartDate(game.dateStarted)
                      ? formatDate(game.dateStarted)
                      : "Not started yet"}
                  </div>

                  <div className="text-sm font-medium">Finished:</div>
                  <div className="text-sm">
                    {isValidStartDate(game.dateFinished)
                      ? formatDate(game.dateFinished)
                      : "Not finished yet"}
                  </div>
                </div>

                {/* <Separator />

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-medium">Dates Played:</h4>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="h-7 px-2 text-xs"
                      >
                        List
                      </Button>
                      <Button
                        variant={
                          viewMode === "calendar" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setViewMode("calendar")}
                        className="h-7 px-2 text-xs"
                      >
                        Calendar
                      </Button>
                    </div>
                  </div>

                  {viewMode === "calendar" ? (
                    <GameCalendar
                      datesPlayed={game.datesPlayed || []}
                      onSelectDate={handleDateSelect}
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {game.datesPlayed?.map((date, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          {formatDate(date)}
                        </Badge>
                      ))}
                    </div>
                  )} 
                </div> */}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Edit Game</Button>
            <Button>Add Play Session</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleGameDetails;
