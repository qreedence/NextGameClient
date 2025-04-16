import { IconType } from "react-icons";
import { FaSteamSquare } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { GoLinkExternal } from "react-icons/go";
import TooltipComponent from "../ui/TooltipComponent";

interface GameLinkProps {
  url: string;
  urlType: "official" | "steam" | "epicGames";
  tooltipText: string;
}

const GameLink = ({ url, urlType, tooltipText }: GameLinkProps) => {
  const icons: { [key: string]: IconType } = {
    official: GoLinkExternal,
    steam: FaSteamSquare,
    epicGames: SiEpicgames,
  };

  const Icon = icons[urlType] || null;

  return (
    <TooltipComponent tooltipText={tooltipText}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        // className="hover:text-primary hover:bg-foreground transition-colors p-1.5 rounded-full"
      >
        {Icon ? <Icon size={32} /> : null}
      </a>
    </TooltipComponent>
  );
};

export default GameLink;
