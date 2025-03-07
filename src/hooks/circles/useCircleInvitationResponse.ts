import { CircleService } from "@/apiclient/services/CircleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGetCirclesForUser from "./useGetCirclesForUser";

interface CircleInvitationResponseProps {
  invitationId: number | undefined;
  circleId: string;
}

const useCircleInvitationResponse = ({
  invitationId,
  circleId,
}: CircleInvitationResponseProps) => {
  const queryClient = useQueryClient();
  const { invalidateCircles } = useGetCirclesForUser();

  const { mutate: circleInvitationResponse, isPending } = useMutation({
    mutationFn: async (response: boolean) => {
      if (invitationId !== undefined) {
        return await CircleService.invitationResponse(invitationId, response);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["circle", circleId] });
      queryClient.invalidateQueries({
        queryKey: ["circleInvitation", circleId],
      });
      invalidateCircles();
    },
  });

  return { circleInvitationResponse, isPending };
};

export default useCircleInvitationResponse;
