import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

const GoogleLoginButton = () => {
  return (
    <form
      method="POST"
      action={`https://localhost:7145/api/auth/external-login?loginProvider=Google&returnUrl=https://localhost:5173`}
    >
      <Button
        variant="default"
        type="submit"
        className="w-full bg-white text-black hover:bg-gray-200 flex items-center border-1 border-gray-300"
      >
        <FcGoogle className="mt-0.5" />
        Login with Google
      </Button>
    </form>
  );
};
export default GoogleLoginButton;
