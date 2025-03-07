import { CircleService, UserToInviteToCircleDTO } from "@/apiclient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface InviteToCircleProps {
  circleId: string;
  username: string;
}

const useInviteToCircle = ({ circleId, username }: InviteToCircleProps) => {
  const queryClient = useQueryClient();

  const {
    mutate: inviteToCircle,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ circleId, username }: InviteToCircleProps) => {
      return await CircleService.inviteToCircle(circleId, username);
    },
    onSuccess: async () => {
      // Update the query data directly
      queryClient.setQueriesData(
        { queryKey: ["friendSearchResult", circleId] },
        (oldData: UserToInviteToCircleDTO[]) => {
          if (!oldData) return oldData;

          return oldData.map((user: UserToInviteToCircleDTO) => {
            if (user.username === username) {
              return { ...user, inviteSent: true };
            }
            return user;
          });
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["friendSearchResult", circleId],
      });
    },
  });

  return { inviteToCircle, isPending, isSuccess };
};

export default useInviteToCircle;
