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
  return (
    <div className="flex items-center justify-center py-4">
      <Carousel
        opts={{
          align: "start",
        }}
        className="my-4"
      >
        <CarouselContent className="flex gap-8">
          {suggestedGames?.map((suggestion) => (
            <CarouselItem key={suggestion.id} className="basis-1/3">
              <SuggestionItem gameSuggestion={suggestion} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {isPending && <PulseLoader size={5} color="white" />}
    </div>
  );
};

export default CircleSuggestions;
