import { create } from "zustand";

interface Store {
  isAuthenticated: boolean;
  temporaryProfilePicture: File | null;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setTemporaryProfilePicture: (temporaryProfilePicture: File) => void;
}

export const useStore = create<Store>((set) => ({
  isAuthenticated: false,
  temporaryProfilePicture: null,
  setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setTemporaryProfilePicture: (temporaryProfilePicture: File | null) =>
    set(() => ({ temporaryProfilePicture })),
}));
