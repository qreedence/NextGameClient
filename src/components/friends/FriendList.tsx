import { UserDTO } from "@/apiclient/models/UserDTO";
import useGetFriendList from "@/hooks/useGetFriendList";
import { PulseLoader } from "react-spinners";
import Friend from "./Friend";

const FriendList = () => {
  const { friends, isPending } = useGetFriendList();

  if (isPending) {
    return (
      <div>
        <PulseLoader />
      </div>
    );
  }

  if (friends !== undefined) {
    return (
      <ul className="flex flex-col gap-1">
        {friends.map((user: UserDTO) => (
          <li key={user.username}>
            <Friend user={user} />
          </li>
        ))}
      </ul>
    );
  }
};

export default FriendList;
