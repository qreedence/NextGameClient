import useAuth from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/settings/ProfileSettings";

const Settings = () => {
  const { userProfile } = useAuth();

  if (userProfile) {
    return (
      <Tabs
        defaultValue="profile"
        className="w-[600px] mx-auto flex flex-col justify-center items-center"
      >
        <TabsList className="w-max">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">
            {userProfile.hasPassword ? "Change Password" : "Set Password"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="w-full">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="password">
          <p>hej</p>
        </TabsContent>
      </Tabs>
    );
  }
};

export default Settings;
