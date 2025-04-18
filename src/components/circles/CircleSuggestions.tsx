import useGetSuggestedGamesForCircle from "@/hooks/circles/useGetSuggestedGamesForCircle";
import { PulseLoader } from "react-spinners";
import SuggestionItem from "./SuggestionItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface CircleSuggestionsProps {
  circleId: string;
}

const CircleSuggestions = ({ circleId }: CircleSuggestionsProps) => {
  const { suggestedGames, isPending } = useGetSuggestedGamesForCircle({
    circleId,
  });

  if (!suggestedGames || suggestedGames.length === 0) {
    return <div className="py-4 text-center">No suggestions yet</div>;
  }

  return (
    <div className="py-4 w-full">
      <div className="relative w-full">
        {isPending && <PulseLoader size={5} color="white" />}
        {suggestedGames?.length && suggestedGames?.length > 0 && (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="flex gap-2">
              {suggestedGames?.map((suggestion) => (
                <CarouselItem
                  key={suggestion.id}
                  className="flex-none basis-[calc(33.333%-0.667rem)] min-w-0"
                >
                  <SuggestionItem gameSuggestion={suggestion} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default CircleSuggestions;
