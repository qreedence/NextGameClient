import CircleComponent from "@/components/circles/CircleComponent";
import CircleInvitationResponse from "@/components/circles/CircleInvitationResponse";
import useGetCircle from "@/hooks/circles/useGetCircle";
import { useParams } from "react-router-dom";

const CirclePage = () => {
  const { circleId } = useParams<{ circleId: string }>();
  const { circle, error } = useGetCircle(circleId!);

  if (error?.message === "Unauthorized" && circleId) {
    return <CircleInvitationResponse circleId={circleId} />;
  }

  if (circle) {
    return (
      <div>
        <CircleComponent circleDTO={circle} />
      </div>
    );
  }
};

export default CirclePage;
