import { CircleService } from "@/apiclient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useCircleInvitationResponse from "@/hooks/circles/useCircleInvitationResponse";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const CircleInvitationPage = () => {
  const { circleInvitationId } = useParams<{ circleInvitationId: string }>();

  const circleInvitationIdNumber = circleInvitationId
    ? parseInt(circleInvitationId, 10)
    : NaN;

  const { circleInvitationResponse } = useCircleInvitationResponse({
    invitationId: circleInvitationIdNumber,
  });

  const handleOnClick = (response: boolean) => {
    circleInvitationResponse(response);
  };

  const {
    data: circleInvitation,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["circleInvitation", circleInvitationId],
    queryFn: async () => {
      return await CircleService.getCircleInvitation(circleInvitationIdNumber);
    },
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <PulseLoader color="white" size={5} />
      </div>
    );
  }

  if (isError)
    return (
      <div className="flex items-center justify-center">
        <p>Sorry, it seems like we couldn't find your invitation.</p>
      </div>
    );

  if (circleInvitation) {
    return (
      <Card className="p-4 flex flex-col items-center">
        <div className="flex gap-4 items-center">
          <Avatar className="border-2 border-white">
            <AvatarImage src={circleInvitation.from.avatar!} />
            <AvatarFallback>Placeholder</AvatarFallback>
          </Avatar>
          {circleInvitation?.from.username} has invited you to join{" "}
          {circleInvitation?.circle.name}.
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              handleOnClick(true);
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              handleOnClick(false);
            }}
            variant="destructive"
          >
            Decline
          </Button>
        </div>
      </Card>
    );
  }
};

export default CircleInvitationPage;
