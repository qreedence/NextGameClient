import { UserToInviteToCircleDTO } from "@/apiclient";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CircleInviteButton from "./CircleInviteButton";

interface FriendSearchResultProps {
  circleId: string;
  user: UserToInviteToCircleDTO;
}

const FriendSearchResult = ({ circleId, user }: FriendSearchResultProps) => {
  if (user && user.inviteSent !== undefined) {
    return (
      <div className="flex justify-between items-center hover:bg-accent py-1 px-2 rounded-md hover:cursor-pointer">
        <div className="flex items-center gap-2">
          <Avatar className="size-12 border-2 border-">
            <AvatarImage src={user.avatar!}></AvatarImage>
            <AvatarFallback className="font-bold">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold text-lg">{user.username}</p>
        </div>
        <CircleInviteButton
          circleId={circleId}
          userName={user.username}
          inviteSent={user.inviteSent}
        />
      </div>
    );
  }
};

export default FriendSearchResult;
