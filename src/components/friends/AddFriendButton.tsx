import { Button } from "../ui/button";
import useSendFriendRequest from "@/hooks/useSendFriendRequest";

interface AddFriendButtonProps {
  userName: string;
}

const AddFriendButton = ({ userName }: AddFriendButtonProps) => {
  const { sendFriendRequest } = useSendFriendRequest();

  return (
    <Button
      variant="default"
      className="font-semibold"
      onClick={() => {
        sendFriendRequest(userName);
      }}
    >
      Add Friend
    </Button>
  );
};

export default AddFriendButton;
