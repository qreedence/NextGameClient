import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconType } from "react-icons";
import { FaSteamSquare } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { GoLinkExternal } from "react-icons/go";

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            // className="hover:text-primary hover:bg-foreground transition-colors p-1.5 rounded-full"
          >
            {Icon ? <Icon size={32} /> : null}
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GameLink;
