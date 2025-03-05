import useInviteToCircle from "@/hooks/circles/useInviteToCircle";
import { Button } from "../ui/button";
import { PulseLoader } from "react-spinners";

interface CircleInviteButtonProps {
  circleId: string;
  userName: string;
  inviteSent: boolean;
}

const CircleInviteButton = ({
  circleId,
  userName,
  inviteSent,
}: CircleInviteButtonProps) => {
  const { inviteToCircle, isPending } = useInviteToCircle();

  const handleClick = () => {
    inviteToCircle({ circleId, username: userName });
  };

  return (
    <Button
      variant="default"
      onClick={handleClick}
      disabled={inviteSent || isPending}
    >
      {isPending && !inviteSent && <PulseLoader color="white" size={5} />}
      {inviteSent ? "Invite Sent" : "Invite"}
    </Button>
  );
};

export default CircleInviteButton;
