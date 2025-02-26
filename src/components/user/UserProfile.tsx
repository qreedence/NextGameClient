import { UserDTO } from "@/apiclient/models/UserDTO";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import useAuth from "@/hooks/useAuth";
import FriendRequestButtonRow from "./FriendRequestButtonRow";

interface UserProfileProps {
  user: UserDTO;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { userProfile: loggedInUser } = useAuth();
  return (
    <>
      <Card className="py-4 flex flex-col">
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="size-12 border-2 border-">
              <AvatarImage src={user.avatar!}></AvatarImage>
              <AvatarFallback className="font-bold">
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-lg">{user.username}</p>
          </div>

          {loggedInUser?.userName !== user.username && (
            <>
              <Separator className="my-4" />
              <FriendRequestButtonRow otherUserUsername={user.username} />
              <Separator className="my-4" />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;
