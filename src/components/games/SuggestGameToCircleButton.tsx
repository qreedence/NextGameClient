import { BiLoaderCircle } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import TooltipComponent from "@/components/ui/TooltipComponent"; // Adjust path as needed
import useGetCirclesForUser from "@/hooks/circles/useGetCirclesForUser";
import useSuggestGameToCircle from "@/hooks/circles/useSuggestGameToCircle";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";

interface SuggestGameToCircleButtonProps {
  gameId: number;
  gameName: string;
  gameCoverUrl: string;
}

const SuggestGameToCircleButton = ({
  gameId,
  gameName,
  gameCoverUrl,
}: SuggestGameToCircleButtonProps) => {
  const { isAuthenticated } = useAuth();
  const { suggestGame, isPending } = useSuggestGameToCircle({
    gameId,
    gameName,
    gameCoverUrl,
  });
  const { circles } = useGetCirclesForUser();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DropdownMenu>
      <TooltipComponent tooltipText={"Suggest game"}>
        <DropdownMenuTrigger asChild>
          <Button className="w-full">
            <BiLoaderCircle />
          </Button>
        </DropdownMenuTrigger>
      </TooltipComponent>
      <DropdownMenuContent side="right">
        <ul>
          {circles?.map((circle) => (
            <li key={`${circle.id}-${gameId}`}>
              <DropdownMenuItem>
                <button
                  disabled={
                    isPending ||
                    circle.suggestionQueue?.some((gs) => gs.gameId === gameId)
                  }
                  className="w-full text-left px-2 flex items-center gap-2"
                  onClick={async () => {
                    suggestGame(circle.id);
                  }}
                >
                  {circle.suggestionQueue?.some(
                    (gs) => gs.gameId === gameId
                  ) ? (
                    <FaCheckCircle />
                  ) : (
                    <FaCircle />
                  )}
                  {circle.name}
                </button>
              </DropdownMenuItem>
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SuggestGameToCircleButton;
