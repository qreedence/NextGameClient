import { UserDTO } from "@/apiclient/models/UserDTO";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import FriendRequestButtonRow from "../user/FriendRequestButtonRow";
import { useNavigate } from "react-router-dom";

interface UserSearchResultProps {
  user: UserDTO;
}

const UserSearchResult = ({ user }: UserSearchResultProps) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (user.username) {
      navigate(`/u/${user.username}`);
    }
  };

  if (user) {
    return (
      <div
        onClick={handleOnClick}
        className="flex justify-between items-center hover:bg-accent py-1 px-2 rounded-md hover:cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Avatar className="size-12 border-2 border-">
            <AvatarImage src={user.avatar!}></AvatarImage>
            <AvatarFallback className="font-bold">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold text-lg">{user.username}</p>
        </div>
        {/* <AddFriendButton userName={user.username} /> */}
        {user.username && (
          <FriendRequestButtonRow otherUserUsername={user.username} />
        )}
      </div>
    );
  }
};

export default UserSearchResult;
