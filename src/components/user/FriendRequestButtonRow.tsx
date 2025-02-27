import useGetFriendshipStatus from "@/hooks/useGetFriendshipStatus";
import { PulseLoader } from "react-spinners";
import AddFriendButton from "../friends/AddFriendButton";
import { Button } from "../ui/button";
import { toast } from "sonner";
import useFriendRequestResponse from "@/hooks/useFriendRequestResponse";
import { FriendRequestResponse } from "@/apiclient/models/FriendRequestResponse";
import FriendDropdownMenu from "./FriendDropdownMenu";

interface FriendRequestButtonRowProps {
  otherUserUsername: string;
}

const FriendRequestButtonRow = ({
  otherUserUsername,
}: FriendRequestButtonRowProps) => {
  const { friendshipStatus, isPending, invalidateGetFriendshipStatus } =
    useGetFriendshipStatus(otherUserUsername);

  const { friendRequestResponse, isPending: isPendingFriendRequestResponse } =
    useFriendRequestResponse();

  const handleOnClick = (responseStatus: number) => {
    if (friendshipStatus?.friendRequestId) {
      const response: FriendRequestResponse = {
        status: responseStatus,
        id: friendshipStatus?.friendRequestId,
      };
      friendRequestResponse(response, {
        onSuccess: () => {
          invalidateGetFriendshipStatus(otherUserUsername);
        },
      });
    }
  };

  return (
    <div>
      {isPending && <PulseLoader color="white" size={5} />}

      {/* 0 === Status.None */}
      {friendshipStatus?.status === 0 && (
        <AddFriendButton userName={otherUserUsername} />
      )}

      {/* 1 === Status.Friends */}
      {friendshipStatus?.status === 1 && (
        <FriendDropdownMenu username={otherUserUsername} />
      )}

      {/* 2 === Status.OutgoingFriendRequest */}
      {friendshipStatus?.status === 2 && (
        <Button
          onClick={() => {
            toast("Not implemented yet");
          }}
        >
          Cancel Friend Request
        </Button>
      )}

      {/* 3 === Status.IncomingFriendRequest */}
      {friendshipStatus?.status === 3 && (
        <div className="flex gap-2">
          <Button
            variant="default"
            onClick={() => {
              // 1 === Accept
              handleOnClick(1);
            }}
          >
            {isPendingFriendRequestResponse ? (
              <>
                <PulseLoader color="white" size={5} />
              </>
            ) : (
              "Accept Friend Request"
            )}
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              // 2 === Decline
              handleOnClick(2);
            }}
          >
            {isPendingFriendRequestResponse ? (
              <>
                <PulseLoader color="white" size={5} />
              </>
            ) : (
              "Decline Friend Request"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FriendRequestButtonRow;
