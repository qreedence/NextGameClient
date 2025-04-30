import { CircleGameDTO } from "@/apiclient";
import { GameList } from "../gamelist/SortableGameList";

interface CurrentlyPlayingProps {
  circleId: string;
  games: Array<CircleGameDTO>;
}

const CurrentlyPlaying = ({ circleId, games }: CurrentlyPlayingProps) => {
  if (circleId) {
    return (
      <GameList circleId={circleId} games={games} title="Currently Playing" />
    );
  }
};

export default CurrentlyPlaying;
