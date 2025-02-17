import { ChangePasswordDTO } from "@/apiclient/models/ChangePasswordDTO";
import { SettingsService } from "@/apiclient/services/SettingsService";
import { useMutation } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { ApiError } from "@/apiclient";
import { toast } from "sonner";

const useChangePassword = () => {
  const { invalidateUserProfile } = useAuth();

  const {
    mutate: changePassword,
    isPending,
    isSuccess,
  } = useMutation<ChangePasswordDTO, Error, ChangePasswordDTO>({
    mutationFn: async (updatedPassword: ChangePasswordDTO) => {
      return SettingsService.changePassword(updatedPassword);
    },
    onSuccess: async () => {
      invalidateUserProfile();
      toast("Password updated.");
    },
    onError: (err) => {
      if (err instanceof ApiError && err.body) {
        const errorMessages = err.body.map(
          (e: { description: string }) => e.description
        );
        console.log(errorMessages);
      } else {
        console.log(["Something went wrong. Please try again."]);
      }
    },
  });

  return {
    changePassword,
    isPending,
    isSuccess,
  };
};

export default useChangePassword;
