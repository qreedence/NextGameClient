import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import ProfileSettingsForm from "./ProfileSettingsForm";
import UploadProfilePicture from "../uploadthing/UploadProfilePicture";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useAuth from "@/hooks/useAuth";

const ProfileSettings = () => {
  const { userProfile } = useAuth();

  return (
    <Card>
      <CardContent>
        <div className="py-4 grid grid-cols-2 items-center">
          <Avatar className="size-24 border-2 border-white">
            <AvatarImage src={userProfile?.avatar} />
            <AvatarFallback>
              {userProfile?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <UploadProfilePicture />
        </div>
        <Separator className="mb-4" />
        <ProfileSettingsForm />
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
