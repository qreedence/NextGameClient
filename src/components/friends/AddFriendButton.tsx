import useGetFriendshipStatus from "@/hooks/useGetFriendshipStatus";
import { Button } from "../ui/button";
import useSendFriendRequest from "@/hooks/useSendFriendRequest";
import PulseLoader from "react-spinners/PulseLoader";

interface AddFriendButtonProps {
  userName: string;
}

const AddFriendButton = ({ userName }: AddFriendButtonProps) => {
  const { sendFriendRequest, isPending } = useSendFriendRequest();
  const { invalidateGetFriendshipStatus } = useGetFriendshipStatus();

  return (
    <Button
      variant="default"
      className="font-semibold"
      onClick={async () => {
        sendFriendRequest(userName, {
          onSuccess: () => {
            invalidateGetFriendshipStatus(userName);
          },
        });
      }}
    >
      {isPending ? <PulseLoader color="white" size={5} /> : "Add Friend"}
    </Button>
  );
};

export default AddFriendButton;
