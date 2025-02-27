import { UserService } from "@/apiclient";
import { useMutation } from "@tanstack/react-query";
import { UserX } from "lucide-react";
import { PulseLoader } from "react-spinners";
import { Button } from "../ui/button";
import useGetFriendshipStatus from "@/hooks/useGetFriendshipStatus";

interface UnfriendButtonProps {
  username: string;
}

const UnfriendButton = ({ username }: UnfriendButtonProps) => {
  const { invalidateGetFriendshipStatus } = useGetFriendshipStatus(username);
  const { mutate: unfriend, isPending } = useMutation({
    mutationFn: async (username: string) => {
      return UserService.unfriend(username);
    },
    onSuccess: () => {
      invalidateGetFriendshipStatus(username);
    },
  });

  return (
    <Button
      onClick={async () => unfriend(username)}
      variant="ghost"
      className="w-full flex gap-2 items-center justify-start"
    >
      {isPending ? (
        <PulseLoader color="white" size={5} />
      ) : (
        <>
          <UserX /> Unfriend
        </>
      )}
    </Button>
  );
};

export default UnfriendButton;
