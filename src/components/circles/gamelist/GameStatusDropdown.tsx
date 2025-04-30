import { GameStatus } from "@/apiclient";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useChangeGameStatus from "@/hooks/circles/useChangeGameStatus";

function getStatusInfo(status?: GameStatus) {
  switch (status) {
    case 1:
      return { text: "Currently Playing", color: "bg-green-500" };
    case 2:
      return { text: "In Rotation", color: "bg-blue-500" };
    case 3:
      return { text: "Backlog", color: "bg-yellow-500" };
    case 4:
      return { text: "Played", color: "bg-purple-500" };
    case 5:
      return { text: "Finished", color: "bg-teal-500" };
    case 6:
      return { text: "Abandoned", color: "bg-red-500" };
    default:
      return { text: "Unknown", color: "bg-gray-500" };
  }
}

interface GameStatusDropdownProps {
  circleGameId: number;
  gameStatus: GameStatus;
}

const GameStatusDropdown = ({
  circleGameId,
  gameStatus,
}: GameStatusDropdownProps) => {
  const statusInfo = getStatusInfo(gameStatus);
  const { changeGameStatus } = useChangeGameStatus({
    circleGameId: circleGameId,
  });

  const handleStatusChange = (newStatus: number) => {
    changeGameStatus(newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge
          className={`${statusInfo.color} text-white cursor-pointer hover:opacity-90`}
        >
          {statusInfo.text}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleStatusChange(1)}>
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            Currently Playing
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange(2)}>
            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
            In Rotation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange(3)}>
            <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
            Backlog
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange(4)}>
            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
            Played
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange(5)}>
            <div className="h-2 w-2 rounded-full bg-teal-500 mr-2"></div>
            Finished
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange(6)}>
            <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
            Abandoned
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default GameStatusDropdown;
