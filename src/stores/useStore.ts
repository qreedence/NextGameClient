import { create } from "zustand";
import { AuthService } from "../apiclient";

interface Store {
    isAuthenticated: boolean;
    checkAuthentication: () => Promise<void>;
    userProfile: UserProfile | null;
    getUserProfile: () => Promise<void>;
}

export const useStore = create<Store>((set) => ({
    isAuthenticated: false,
    checkAuthentication: async () => {
        try {
            const isAuth = await AuthService.ping();
            set({ isAuthenticated: isAuth });
        } catch (err) {
            console.error("Error checking authentication: ", err);
            set({isAuthenticated: false});
        }
    },
    userProfile: null,
    getUserProfile: async () => {
        // try {
        //     const profile = await AuthService.getUserProfile();
        //         set((state) => ({
        //             userProfile: { ...state.userProfile, userName: profile.userName, hasPassword: profile.hasPassword },
        //           }));
        // } catch(err){
        //     console.error("Error: ", err);
        // }

        try {
            const profile = await AuthService.getUserProfile();
            set(() => ({
              userProfile: {
                userName: profile.userName,
                avatar: profile.avatar || "",
                hasPassword: profile.hasPassword,
              },
            }));
          } catch (err) {
            console.error("Error: ", err);
            set({ userProfile: null }); // Set to null on error
          }
        },
      }));

export type UserProfile = {
    userName: string,
    avatar: string,
    hasPassword: boolean,
}