import { useCallback, useState } from "react";
import { debounce } from "react-advanced-cropper";
import { Input } from "../ui/input";
import { UserDTO } from "@/apiclient/models/UserDTO";
import FriendSearchResult from "./FriendSearchResult";
import useFindFriendsToInviteToCircle from "@/hooks/circles/useFindFriendsToInviteToCircle";
import { PulseLoader } from "react-spinners";

interface FriendSearchBarProps {
  circleId: string;
}

const FriendSearchBar = ({ circleId }: FriendSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isPending,
    isSuccess,
  } = useFindFriendsToInviteToCircle({ circleId, userName: searchTerm });

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 200),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      <Input type="text" placeholder="Username" onChange={handleSearchChange} />

      <div>
        {isPending && searchTerm && <PulseLoader size={5} color="white" />}
        {isSuccess && searchResults && searchResults.length > 0 && (
          <ul className="flex flex-col gap-1">
            {searchResults.map((user: UserDTO) => (
              <li key={user.username}>
                <FriendSearchResult user={user} circleId={circleId} />
              </li>
            ))}
          </ul>
        )}
        {isSuccess && searchResults && searchResults.length === 0 && (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default FriendSearchBar;
