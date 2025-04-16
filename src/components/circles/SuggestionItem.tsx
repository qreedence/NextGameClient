import { GameSuggestion } from "@/apiclient";
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

interface SuggestionItemProps {
  gameSuggestion: GameSuggestion;
}

const SuggestionItem = ({ gameSuggestion }: SuggestionItemProps) => {
  return (
    <Card className="w-[105%] flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-1 font-black text-2xl">
          <Link to={`/game/${gameSuggestion.gameId}`}>
            {gameSuggestion.gameName}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Sparkles className="h-3 w-3" />
          Suggested by{" "}
          <Link className="font-bold" to={`/u/${gameSuggestion.suggestedBy}`}>
            {gameSuggestion.suggestedBy}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {gameSuggestion.gameCoverUrl && (
          <div className="aspect-[3/4] max-h-72 mb-4 overflow-hidden rounded-md">
            <Link to={`/game/${gameSuggestion.gameId}`}>
              <img
                src={
                  gameSuggestion.gameCoverUrl ||
                  "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"
                }
                alt={gameSuggestion.gameName}
                className="rounded-sm border-2 border-background object-cover w-full h-full"
              />
            </Link>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between w-full">
          <Button size="sm" className={`flex-1 mr-2 }`}>
            <ThumbsUp className="h-4 w-4 mr-2" />
            Yes
          </Button>
          <Button size="sm" className={`flex-1`}>
            <ThumbsDown className="h-4 w-4 mr-2" />
            No
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default SuggestionItem;
