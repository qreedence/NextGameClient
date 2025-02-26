import UserProfile from "@/components/user/UserProfile";
import useGetPublicUserProfile from "@/hooks/useGetPublicUserProfile";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const UserPage = () => {
  const { username } = useParams<{ username: string }>();
  const { publicUserProfile, isPending, isError } =
    useGetPublicUserProfile(username);

  return (
    <div className="flex items-center justify-center">
      {isPending && <PulseLoader color="white" size={5} />}
      {isError && <p>Oops! Something went wrong.</p>}
      {publicUserProfile && <UserProfile user={publicUserProfile} />}
    </div>
  );
};

export default UserPage;
