import CircleListItem from "@/components/circles/CircleListItem";
import useGetCirclesForUser from "@/hooks/circles/useGetCirclesForUser";
import { PulseLoader } from "react-spinners";

const Circles = () => {
  const { circles, isPending } = useGetCirclesForUser();

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <PulseLoader color="white" size={5} />
      </div>
    );
  }

  return (
    <ul>
      {circles &&
        circles.map((circle) => (
          <CircleListItem key={circle.id} circleDTO={circle} />
        ))}
    </ul>
  );
};

export default Circles;
