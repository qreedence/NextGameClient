import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import FriendSearchBar from "./FriendSearchBar";

interface CircleInviteProps {
  circleId: string;
}

const CircleInviteDialog = ({ circleId }: CircleInviteProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="w-5" />
          Invite friend
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center">
          Search for a friend to invite
        </DialogTitle>
        <FriendSearchBar circleId={circleId} />
      </DialogContent>
    </Dialog>
  );
};

export default CircleInviteDialog;
