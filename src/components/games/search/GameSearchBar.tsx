import { Input } from "@/components/ui/input";
import useSearchGame from "@/hooks/games/useSearchGame";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "react-advanced-cropper";
import GameSearchDropdown from "./GameSearchDropDown";

const GameSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const { games, isPending } = useSearchGame(debouncedSearchTerm);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 200),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSetSearchTerm(value);
  };

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchTerm]);

  const handleSearchBarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (searchTerm.length > 0) {
      setDropdownVisible(true);
    }
  };

  const getDropdownPosition = () => {
    if (searchInputRef.current) {
      const rect = searchInputRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      };
    }
    return { top: 0, left: 0, width: 0 };
  };

  return (
    <div>
      <Input
        ref={searchInputRef}
        type="text"
        placeholder="Search for a game"
        value={searchTerm}
        onClick={handleSearchBarClick}
        onChange={handleSearchChange}
        className="border p-2 rounded w-72"
      />

      {dropdownVisible && (
        <GameSearchDropdown
          games={games}
          closeDropdown={() => setDropdownVisible(false)}
          position={getDropdownPosition()}
          isLoading={isPending}
        />
      )}
    </div>
  );
};

export default GameSearchBar;
