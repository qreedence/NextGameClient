import { GameSearchResultDTO } from "@/apiclient";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

interface GameSearchDropdownProps {
  games: GameSearchResultDTO[] | undefined;
  closeDropdown: () => void;
  position: { top: number; left: number; width: number };
  isLoading: boolean;
}

const GameSearchDropdown = ({
  games,
  closeDropdown,
  position,
  isLoading,
}: GameSearchDropdownProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("game-search-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeDropdown]);

  return (
    <ul
      id="game-search-dropdown"
      className="absolute bg-white shadow-lg max-h-60 overflow-y-auto z-10 rounded border border-gray-300"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
      }}
    >
      {isLoading ? (
        <li className="p-4 flex justify-center">
          <PulseLoader size={5} color="black" />
        </li>
      ) : games && games.length > 0 ? (
        games.map((game) => (
          <li key={game.id} className="flex items-center p-2 hover:bg-gray-200">
            <Link
              to={`/game/${game.id}`}
              className="flex items-center w-full"
              onClick={closeDropdown}
            >
              <img
                src={game.coverUrl ?? "https://via.placeholder.com/50"}
                alt={game.name ?? "N/A"}
                className="w-12 h-12 mr-2 object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-black">{game.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(
                    (game.first_release_date ?? 0) * 1000
                  ).getFullYear()}
                </span>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <li className="p-2 text-gray-500">No results found</li>
      )}
    </ul>
  );
};

export default GameSearchDropdown;
