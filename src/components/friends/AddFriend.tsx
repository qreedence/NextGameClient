import useSearchUser from "@/hooks/useSearchUser";
import { useCallback, useState } from "react";
import { debounce } from "react-advanced-cropper";
import { Input } from "../ui/input";
import { UserDTO } from "@/apiclient/models/UserDTO";
import UserSearchResult from "./UserSearchResult";

const AddFriend = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isPending,
    isSuccess,
  } = useSearchUser(searchTerm);

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
      <p className="text-muted text-sm font-semibold">
        Search for people to add as friends. If someone you're looking for has
        their account set to provide, you will not be able to find them here.
      </p>
      <Input
        type="text"
        placeholder="Enter your friend's username"
        onChange={handleSearchChange}
      />

      <div>
        {isPending && searchTerm && <p>Loading...</p>}
        {isSuccess && searchResults && searchResults.length > 0 && (
          <ul className="flex flex-col gap-1">
            {searchResults.map((user: UserDTO) => (
              <li key={user.username}>
                <UserSearchResult user={user} />
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

export default AddFriend;
