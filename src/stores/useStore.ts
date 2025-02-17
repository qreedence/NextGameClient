import { create } from "zustand";
import { UserProfileDTO, UserSettingsDTO } from "../apiclient";

interface Store {
  isAuthenticated: boolean;
  userProfile: UserProfileDTO | null;
  userSettings: UserSettingsDTO | null;
  uploadThingPresignedUrl: string;
  temporaryProfilePicture: File | null;

  setAuthenticated: (isAuthenticated: boolean) => void;
  setUserProfile: (userProfile: UserProfileDTO) => void;
  setUserSettings: (userSettings: UserSettingsDTO) => void;
  setUploadThingPresignedUrl: (uploadThingPresignedUrl: string) => void;
  setTemporaryProfilePicture: (temporaryProfilePicture: File) => void;
}

export const useStore = create<Store>((set) => ({
  isAuthenticated: false,
  userProfile: null,
  userSettings: null,
  uploadThingPresignedUrl: "",
  temporaryProfilePicture: null,

  setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setUserProfile: (userProfile: UserProfileDTO) => set({ userProfile }),
  setUserSettings: (userSettings: UserSettingsDTO) => set({ userSettings }),
  setUploadThingPresignedUrl: (uploadThingPresignedUrl: string) =>
    set({ uploadThingPresignedUrl }),
  setTemporaryProfilePicture: (temporaryProfilePicture: File | null) =>
    set(() => ({ temporaryProfilePicture })),
}));
