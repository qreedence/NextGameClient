import { CircleDTO } from "@/apiclient";
import CircleSideBar from "./CircleSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { GameList } from "./gamelist/SortableGameList";
import CircleSuggestions from "./CircleSuggestions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Users } from "lucide-react";
import { FaShieldAlt } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import CircleInviteDialog from "./CircleInviteDialog";
import CircleOptionsDropdown from "./CircleOptionsDropdown";
import { Separator } from "../ui/separator";

interface CircleComponent {
  circleDTO: CircleDTO;
}

const CircleComponent = ({ circleDTO }: CircleComponent) => {
  const sortedMembers = circleDTO.activeMembers
    ?.slice()
    .sort((a, b) => a.role - b.role);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeView = searchParams.get("view") || "currently-playing";

  const handleViewChange = (view: string) => {
    setSearchParams({ view }); // Update query parameter
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  const renderContent = () => {
    switch (activeView) {
      case "currently-playing":
        return (
          circleDTO.circleGames && (
            <GameList
              key="game-status-1"
              circleId={circleDTO.id}
              games={circleDTO.circleGames.filter((g) => g.gameStatus === 1)}
              title="Currently Playing"
            />
          )
        );
      case "in-rotation":
        return (
          circleDTO.circleGames && (
            <GameList
              key="game-status-2"
              circleId={circleDTO.id}
              games={circleDTO.circleGames.filter((g) => g.gameStatus === 2)}
              title="In Rotation"
            />
          )
        );
      case "backlog":
        return (
          circleDTO.circleGames && (
            <GameList
              key="game-status-3"
              circleId={circleDTO.id}
              games={circleDTO.circleGames.filter((g) => g.gameStatus === 3)}
              title="Backlog"
            />
          )
        );

      case "played":
        return (
          circleDTO.circleGames && (
            <GameList
              key="game-status-4"
              circleId={circleDTO.id}
              games={circleDTO.circleGames.filter((g) => g.gameStatus === 4)}
              title="Played"
            />
          )
        );

      case "completed":
        return (
          circleDTO.circleGames && (
            <GameList
              key="game-status-5"
              circleId={circleDTO.id}
              games={circleDTO.circleGames.filter((g) => g.gameStatus === 5)}
              title="Completed"
            />
          )
        );

      case "abandoned":
        return (
          circleDTO.circleGames && (
            <GameList
              key="game-status-6"
              circleId={circleDTO.id}
              games={circleDTO.circleGames.filter((g) => g.gameStatus === 6)}
              title="Abandoned"
            />
          )
        );

      case "suggestions":
        return <CircleSuggestions circleId={circleDTO.id} />;

      case "settings":
        return <p>Not implemented yet</p>;

      default:
        return (
          circleDTO.circleGames && (
            <GameList
              circleId={circleDTO.id}
              games={circleDTO.circleGames.filter((g) => g.gameStatus === 1)}
              title="currently-playing"
            />
          )
        );
    }
  };

  return (
    <SidebarProvider>
      <CircleSideBar onTabChange={handleViewChange} activeTab={activeView} />
      <SidebarTrigger />
      <SidebarInset className="flex-1 md:pl-[20%] pr-[20%] py-6">
        <div className="flex justify-between">
          <p className="font-black text-3xl tracking-normal">
            {circleDTO.name}
          </p>
          <div className="flex items-center gap-2">
            <CircleInviteDialog circleId={circleDTO.id} />
            <CircleOptionsDropdown circleId={circleDTO.id} />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
          {renderContent()}
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
                  {sortedMembers?.map((circleMember) => (
                    <div
                      key={`${circleMember.user.userId}-${circleDTO.id}`}
                      className="flex items-center gap-4"
                    >
                      <div className="relative">
                        {circleMember.user.avatar !== null && (
                          <Avatar className="border-2 border-white">
                            <AvatarImage
                              src={circleMember.user.avatar}
                              alt={circleMember.user.username}
                            />
                            <AvatarFallback>
                              {circleMember.user.username.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate font-medium flex items-center gap-2">
                          {circleMember.user.username}
                          {circleMember.role === 0 && <FaCrown />}
                          {circleMember.role === 1 && <FaShieldAlt />}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    toast("Not implemented yet!");
                  }}
                >
                  Manage Circle
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CircleComponent;
