import CircleComponent from "@/components/circles/CircleComponent";
import { useParams } from "react-router-dom";

const CirclePage = () => {
  const { circleId } = useParams<{ circleId: string }>();
  if (circleId !== undefined) {
    return (
      <div>
        <CircleComponent id={circleId} />
      </div>
    );
  }
};

export default CirclePage;
