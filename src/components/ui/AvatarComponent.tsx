import useAuth from "@/hooks/useAuth";
import { useStore } from "../../stores/useStore";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const AvatarComponent = () => {
  const { temporaryProfilePicture } = useStore();
  const { userProfile, isAuthenticated } = useAuth();

  if (temporaryProfilePicture !== null) {
    return (
      <Avatar className="size-12 border-2 border-white">
        <AvatarImage src={URL.createObjectURL(temporaryProfilePicture)} />
        <AvatarFallback>
          {userProfile?.userName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  }

  if (isAuthenticated && userProfile) {
    return (
      <Avatar className="size-12 border-2 border-white">
        <AvatarImage src={userProfile.avatar} />
        <AvatarFallback>
          {userProfile?.userName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  }
};

export default AvatarComponent;
