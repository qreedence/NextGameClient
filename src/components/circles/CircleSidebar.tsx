import { ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { IoGameController, IoSparklesSharp } from "react-icons/io5";

import { FaCircleCheck, FaRotate } from "react-icons/fa6";
import { FaArchive, FaHistory, FaPlayCircle, FaTrophy } from "react-icons/fa";
import { ImCross } from "react-icons/im";

interface CircleSideBarProps {
  onTabChange: (view: string) => void;
  activeTab: string;
}

const CircleSideBar = ({ onTabChange, activeTab }: CircleSideBarProps) => {
  const gameMenuItems = [
    {
      title: "Currently Playing",
      value: "currently-playing",
      icon: FaPlayCircle,
    },
    { title: "In Rotation", value: "in-rotation", icon: FaRotate },
    { title: "Backlog", value: "backlog", icon: FaArchive },
  ];

  const gameHistoryMenuitems = [
    { title: "Completed", value: "completed", icon: FaTrophy },
    { title: "Played", value: "played", icon: FaCircleCheck },
    { title: "Abandoned", value: "abandoned", icon: ImCross },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="h-full relative">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Games Menu */}
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <IoGameController />
                      Games
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {gameMenuItems.map((item) => (
                        <SidebarMenuSubItem key={item.value}>
                          <SidebarMenuSubButton
                            className={
                              activeTab === item.value ? "bg-muted" : ""
                            }
                            onClick={() => onTabChange(item.value)}
                          >
                            <div className="flex hover:cursor-pointer items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <p>{item.title}</p>
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Suggested Games */}

              <SidebarMenuItem>
                <SidebarMenuButton
                  className={activeTab === "suggestions" ? "bg-muted" : ""}
                  onClick={() => onTabChange("suggestions")}
                >
                  <IoSparklesSharp />
                  Suggestions
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Game History Menu */}

              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <FaHistory />
                      History
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {gameHistoryMenuitems.map((item) => (
                        <SidebarMenuSubItem key={item.value}>
                          <SidebarMenuSubButton
                            className={
                              activeTab === item.value ? "bg-muted" : ""
                            }
                            onClick={() => onTabChange(item.value)}
                          >
                            <div className="flex hover:cursor-pointer items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <p>{item.title}</p>
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* End of Game History Menu */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Circle Settings */}

        {/* <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={activeTab === "settings" ? "bg-muted" : ""}
                onClick={() => onTabChange("settings")}
              >
                <IoIosSettings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
  );
};

export default CircleSideBar;
