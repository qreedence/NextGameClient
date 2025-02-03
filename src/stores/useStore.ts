import { create } from "zustand";
import { AuthService } from "../apiclient";

interface Store {
    isAuthenticated: boolean;
    checkAuthentication: () => Promise<void>;
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
    }
}))