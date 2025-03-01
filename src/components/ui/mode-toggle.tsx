import { Moon, Sun } from "lucide-react";

import { useTheme } from "./theme-provider";
import { Button } from "./button";
import { Switch } from "./switch";

interface ModeToggleProps {
  variant: "button" | "switch";
}

export function ModeToggle({ variant }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();
  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (variant === "button") {
    return (
      <Button variant="outline" size="icon" onClick={handleClick}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    );
  }

  if (variant === "switch") {
    return (
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    );
  }
}
