import { CircleGameDTO } from "@/apiclient";
import { GameList } from "../gamelist/SortableGameList";

interface InRotationProps {
  circleId: string;
  games: Array<CircleGameDTO>;
}

const InRotation = ({ circleId, games }: InRotationProps) => {
  if (circleId) {
    return <GameList circleId={circleId} games={games} title="In Rotation" />;
  }
};

export default InRotation;
