import { CircleService } from "@/apiclient/services/CircleService";
import { useMutation } from "@tanstack/react-query";

interface CircleInvitationResponseProps {
  invitationId: number;
}

const useCircleInvitationResponse = ({
  invitationId,
}: CircleInvitationResponseProps) => {
  const { mutate: circleInvitationResponse, isPending } = useMutation({
    mutationFn: async (response: boolean) => {
      return await CircleService.invitationResponse(invitationId, response);
    },
  });

  return { circleInvitationResponse, isPending };
};

export default useCircleInvitationResponse;
