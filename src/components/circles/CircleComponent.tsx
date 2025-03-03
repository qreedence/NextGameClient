import useGetCircle from "@/hooks/circles/useGetCircle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Gamepad2, ListPlus, RotateCw, UserPlus, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";

interface CircleComponent {
  id: string;
}

const CircleComponent = ({ id }: CircleComponent) => {
  const { circle } = useGetCircle(id);

  return (
    <>
      <div className="flex justify-between">
        <p>{circle?.name} Component</p>
        <Button
          onClick={() => {
            toast("Not implemented yet!");
          }}
        >
          <UserPlus />
          Invite friend
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="container grid gap-6 py-6 xl:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current" className="flex items-center gap-2">
                <Gamepad2 className="size-5" />
                <span>Currently Playing</span>
              </TabsTrigger>
              <TabsTrigger value="rotation" className="flex items-center gap-2">
                <RotateCw className="size-5" />
                <span>In Rotation</span>
              </TabsTrigger>
              <TabsTrigger
                value="suggestions"
                className="flex items-center gap-2"
              >
                <ListPlus className="size-5" />
                <span>Suggestions</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="current">
              <p>Currently playing.</p>
            </TabsContent>
            <TabsContent value="rotation">
              <p>In rotation.</p>
            </TabsContent>
            <TabsContent value="suggestions">
              <p>Suggestion queue.</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Circle Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {circle?.activeMembers?.map((userDTO) => (
                  <div
                    key={userDTO.username}
                    className="flex items-center gap-4"
                  >
                    <div className="relative">
                      {userDTO.avatar !== null && (
                        <Avatar className="border-2 border-white">
                          <AvatarImage
                            src={userDTO.avatar}
                            alt={userDTO.username}
                          />
                          <AvatarFallback>
                            {userDTO.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-medium">{userDTO.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Manage Circle
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CircleComponent;
