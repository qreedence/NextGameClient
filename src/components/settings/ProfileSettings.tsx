import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import ProfileSettingsForm from "./ProfileSettingsForm";
import UploadProfilePicture from "../uploadthing/UploadProfilePicture";
import AvatarComponent from "../ui/AvatarComponent";

const ProfileSettings = () => {
  return (
    <Card>
      <CardContent>
        <div className="py-4 grid grid-cols-2 items-center">
          <AvatarComponent size={24} />
          <UploadProfilePicture />
        </div>
        <Separator className="mb-4" />
        <ProfileSettingsForm />
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
