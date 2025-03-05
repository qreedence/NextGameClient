import { EllipsisVertical, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useLeaveCircle from "@/hooks/circles/useLeaveCircle";
import { useNavigate } from "react-router-dom";

interface CircleOptionsDropdownProps {
  circleId: string;
}

const CircleOptionsDropdown = ({ circleId }: CircleOptionsDropdownProps) => {
  const { leaveCircle } = useLeaveCircle({ circleId });
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full size-9">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 mt-1 bg-background text-foreground"
        align="end"
      >
        <DropdownMenuItem className="hover:bg-destructive">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start hover:bg-destructive"
            onClick={() => {
              leaveCircle(circleId, {
                onSuccess: async () => {
                  navigate("/circles");
                },
              });
            }}
          >
            <LogOut />
            Leave circle
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CircleOptionsDropdown;
