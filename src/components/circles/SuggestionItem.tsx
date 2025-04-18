import type { GameSuggestionDTO } from "@/apiclient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import useVoteOnSuggestedGame from "@/hooks/circles/useVoteOnSuggestedGame";
import useAuth from "@/hooks/useAuth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import CircleGameOptionsDropdown from "./CircleGameOptionsDropdown";

interface SuggestionItemProps {
  gameSuggestion: GameSuggestionDTO;
}

const SuggestionItem = ({ gameSuggestion }: SuggestionItemProps) => {
  const { voteOnSuggestedGame } = useVoteOnSuggestedGame();
  const { userProfile } = useAuth();

  const yesVotes =
    gameSuggestion.votes?.filter((vote) => vote.status === 1) || [];
  const noVotes =
    gameSuggestion.votes?.filter((vote) => vote.status === 2) || [];
  const totalVotes = gameSuggestion.votes?.length || 0;

  const yesPercentage =
    totalVotes > 0 ? (yesVotes.length / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (noVotes.length / totalVotes) * 100 : 0;

  const yesVoterNames = yesVotes.map((vote) => vote.user.username).join(", ");
  const noVoterNames = noVotes.map((vote) => vote.user.username).join(", ");

  const hasVoted = gameSuggestion.votes?.some(
    (gs) => gs.user.userId === userProfile?.userId
  );

  return (
    <Card className="flex flex-col min-w-78">
      <CardHeader>
        <CardTitle className="line-clamp-1 flex justify-between">
          <Link
            className="font-black text-2xl"
            to={`/game/${gameSuggestion.gameId}`}
          >
            {gameSuggestion.gameName}
          </Link>

          {/* CurrentlyPlaying = 1,
              InRotation = 2,
              Backlog = 3,
              Played = 4,
              Finished = 5,
              Abandoned = 6, */}

          <CircleGameOptionsDropdown
            circleId={gameSuggestion.circleId!}
            gameId={gameSuggestion.gameId!}
            gameName={gameSuggestion.gameName!}
            gameCoverUrl={gameSuggestion.gameCoverUrl!}
            players={
              gameSuggestion.votes?.map((vote) => vote.user.username) ?? []
            }
            gameStatus={1}
            suggestedBy={gameSuggestion.suggestedBy!}
          />
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Sparkles className="h-3 w-3" />
          Suggested by
          <Link
            className="font-bold text-foreground"
            to={`/u/${gameSuggestion.suggestedBy}`}
          >
            {gameSuggestion.suggestedBy}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="aspect-[3/4] max-h-72 mb-4 overflow-hidden rounded-md">
          <Link to={`/game/${gameSuggestion.gameId}`}>
            <img
              src={
                gameSuggestion.gameCoverUrl
                  ? gameSuggestion.gameCoverUrl
                  : "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"
              }
              alt={gameSuggestion.gameName}
              className="rounded-sm border-2 border-background object-cover w-full h-full"
            />
          </Link>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-col w-full">
        {!hasVoted ? (
          <div className="flex justify-between w-full">
            <Button
              size="sm"
              className="flex-1 mr-2"
              onClick={async () => {
                voteOnSuggestedGame({
                  gameSuggestionId: gameSuggestion.id!,
                  gameVoteStatus: 1,
                });
              }}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Yes
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={async () => {
                voteOnSuggestedGame({
                  gameSuggestionId: gameSuggestion.id!,
                  gameVoteStatus: 2,
                });
              }}
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              No
            </Button>
          </div>
        ) : (
          <div className="w-full">
            {/* <p className="flex flex-row items-center gap-2 justify-center mb-3">
              <FaCheckCircle className="text-green-500" />
              <span>Voted</span>
            </p> */}
            <div className="w-full mt-2 space-y-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">Voting Results</span>
                <span className="text-xs text-muted-foreground">
                  {totalVotes} total votes
                </span>
              </div>

              <TooltipProvider>
                <div className="relative h-8 w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                  {yesPercentage > 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute top-0 left-0 h-full bg-green-500 flex items-center justify-start pl-2"
                          style={{ width: `${yesPercentage}%` }}
                        >
                          {yesPercentage >= 10 && (
                            <div className="flex items-center text-white text-xs">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{yesVotes.length}</span>
                            </div>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="font-semibold">
                          Yes Votes ({yesVotes.length})
                        </p>
                        {yesVotes.length > 0 ? (
                          <p className="text-xs">{yesVoterNames}</p>
                        ) : (
                          <p className="text-xs">No votes yet</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {noPercentage > 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute top-0 h-full bg-red-500 flex items-center justify-start pl-2"
                          style={{
                            width: `${noPercentage}%`,
                            left: `${yesPercentage}%`,
                          }}
                        >
                          {noPercentage >= 10 && (
                            <div className="flex items-center text-white text-xs">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              <span>{noVotes.length}</span>
                            </div>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="font-semibold">
                          No Votes ({noVotes.length})
                        </p>
                        {noVotes.length > 0 ? (
                          <p className="text-xs">{noVoterNames}</p>
                        ) : (
                          <p className="text-xs">No votes yet</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {totalVotes === 0 && (
                    <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">
                      No votes yet
                    </div>
                  )}
                </div>
              </TooltipProvider>

              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  <ThumbsUp className="h-3 w-3 mr-1 text-green-500" />
                  <span>
                    {yesVotes.length} ({yesPercentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="flex items-center">
                  <span>
                    {noVotes.length} ({noPercentage.toFixed(0)}%)
                  </span>
                  <ThumbsDown className="h-3 w-3 ml-1 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SuggestionItem;
