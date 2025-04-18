import { CircleGameDTO } from "@/apiclient";
import { GameList } from "../gamelist/SortableGameList";

interface CurrentlyPlayingProps {
  circleId: string;
  games: Array<CircleGameDTO>;
}

const InRotation = ({ circleId, games }: CurrentlyPlayingProps) => {
  if (circleId) {
    return <GameList circleId={circleId} games={games} />;
  }
};

export default InRotation;
