import {
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaAndroid,
  FaLinux,
  FaApple,
} from "react-icons/fa";
import { SiNintendoswitch, SiNintendo3Ds } from "react-icons/si";
import { IconType } from "react-icons";

interface PlatformTagProps {
  platform: string;
}

const PlatformTag = ({ platform }: PlatformTagProps) => {
  const platformIcons: { [key: string]: IconType } = {
    PS5: FaPlaystation,
    PS4: FaPlaystation,
    "Series X|S": FaXbox,
    XONE: FaXbox,
    PC: FaWindows,
    Android: FaAndroid,
    Linux: FaLinux,
    Switch: SiNintendoswitch,
    "Switch 2": SiNintendoswitch,
    Mac: FaApple,
    NDS: SiNintendo3Ds,
  };

  const Icon = platformIcons[platform] || null;

  return (
    <div className="flex justify-center items-center gap-2 py-1 px-2 cursor-pointer border-accent border-2 rounded-md hover:bg-primary hover:text-primary-foreground">
      {Icon ? <Icon /> : null}
      {platform}
    </div>
  );
};

export default PlatformTag;
