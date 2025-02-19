import { UserDTO } from "@/apiclient/models/UserDTO";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface UserSearchResultProps {
  user: UserDTO;
}

const UserSearchResult = ({ user }: UserSearchResultProps) => {
  if (user) {
    return (
      <div className="flex justify-between items-center hover:bg-accent py-1 px-2 rounded-md">
        <div className="flex items-center gap-2">
          <Avatar className="size-12 border-2 border-">
            <AvatarImage src={user.avatar!}></AvatarImage>
            <AvatarFallback className="font-bold">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold text-lg">{user.username}</p>
        </div>
        <Button
          variant="default"
          className="font-semibold"
          onClick={() => {
            toast("Not implemented yet!");
          }}
        >
          Add Friend
        </Button>
      </div>
    );
  }
};

export default UserSearchResult;
