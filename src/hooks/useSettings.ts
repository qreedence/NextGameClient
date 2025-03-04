import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SettingsService, UserSettingsDTO } from "../apiclient";
import useAuth from "./useAuth";
import { toast } from "sonner";

const useSettings = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, userProfile, invalidateUserProfile } = useAuth();

  //fetch data for userSettings
  const { data: userSettings, isLoading } = useQuery<UserSettingsDTO, Error>({
    queryKey: ["currentUserSettings"],
    queryFn: async () => {
      return await SettingsService.getUserSettings();
    },
    enabled: isAuthenticated === true && userProfile !== undefined,
  });

  //update user settings
  const {
    mutate: updateUserSettings,
    isPending,
    isSuccess,
  } = useMutation<UserSettingsDTO, Error, UserSettingsDTO>({
    mutationFn: async (updatedSettings: UserSettingsDTO) => {
      return SettingsService.updateUserSettings(updatedSettings);
    },
    onSuccess: async (data) => {
      invalidateUserSettings();
      invalidateUserProfile();
      toast("Settings updated.");
      return data;
    },
    onError: (error) => {
      console.error("Error updating settings:", error);
    },
  });

  const invalidateUserSettings = () => {
    queryClient.invalidateQueries({ queryKey: ["currentUserSettings"] });
  };

  return {
    userSettings,
    isLoading,
    isPending,
    isSuccess,
    updateUserSettings,
    invalidateUserSettings,
  };
};

export default useSettings;
