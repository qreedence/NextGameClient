import AddFriend from "@/components/friends/AddFriend";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import { UserPlus, Users } from "lucide-react";

const Friends = () => {
  return (
    <div className="container mx-auto p-4">
      <Tabs
        orientation="vertical"
        defaultValue="friends"
        className="flex space-x-8"
      >
        <TabsList className="flex flex-col h-[400px] items-stretch p-2 rounded-lg bg-accent">
          <TabsTrigger
            className="justify-start px-4 py-2 text-left flex gap-2"
            value={"friends"}
          >
            <Users className="w-5" />
            Friends
          </TabsTrigger>
          <TabsTrigger
            className="justify-start px-4 py-2 text-left flex gap-2"
            value={"addFriends"}
          >
            <UserPlus />
            Add Friends
          </TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="friends" className="mt-0">
            <Card className="w-full">
              <CardContent className="py-2">
                <p>Stuff</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="addFriends" className="mt-0">
            <Card className="w-full">
              <CardContent className="py-2">
                <AddFriend />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Friends;
