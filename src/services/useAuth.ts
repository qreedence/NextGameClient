import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfileDTO } from "../apiclient/models/UserProfileDTO";
import { useStore } from "../stores/useStore";
import { AuthService } from "../apiclient/services/AuthService";
import { LoginDTO, SettingsService, UserSettingsDTO } from "../apiclient";
import { useEffect } from "react";

const useAuth = () => {
    const queryClient = useQueryClient();
    const {isAuthenticated: storedIsAuthenticated, setAuthenticated} = useStore();

    //fetch data for isAuthenticated
    const {data: isAuthenticated} = useQuery<boolean, Error>({
        queryKey: ["isAuthenticated"],
        queryFn: async () => {
            return await AuthService.ping();
        },
    })

    // //update store, maybe remove this
    useEffect(() => {
        if (isAuthenticated !== undefined){
            setAuthenticated(isAuthenticated);
        }
    },[isAuthenticated, storedIsAuthenticated, setAuthenticated])

    //fetch data for userProfile
    const {data: userProfile, isLoading: isLoadingProfile} = useQuery<UserProfileDTO, Error>({
        queryKey: ["currentUserProfile"],
        queryFn: async () => {
                return await AuthService.getUserProfile();
        },
        enabled: isAuthenticated === true,
        staleTime: 0,
    });

    // //update store, maybe remove this
    // useEffect(() => {
    //     if (userProfile){
    //         setUserProfile(userProfile);
    //     }
    // },[userProfile, setUserProfile])    
    
    //fetch data for userSettings
    const {data: userSettings, isLoading:isLoadingSettings} = useQuery<UserSettingsDTO, Error>({
        queryKey: ["currentUserSettings"],
        queryFn: async () => {
            return await SettingsService.getUserSettings();
        },
        enabled: isAuthenticated === true,
    });

    // //update store, maybe remove this
    // useEffect(() => {
    //     if (userSettings){
    //         setUserSettings(userSettings);
    //     }
    // },[userSettings, setUserSettings])    

    //login
    const {mutate: login} = useMutation<void, Error, LoginDTO>({
        mutationFn: async(loginDTO: LoginDTO) => {
            return await AuthService.loginUser(loginDTO);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["isAuthenticated"]});
        }
    })

    //logout
    const {mutate: logout} = useMutation<void, Error>({
        mutationFn: async () => {
            return await AuthService.logoutUser();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["isAuthenticated"]});
        },
    });

    //complete externalAuth
    const {mutate: externalAuthComplete} = useMutation<string, Error, string>({
        mutationFn: async (tokenId: string) => {
            localStorage.setItem("isLoggingIn", "true");
            return await AuthService.externalAuthComplete(tokenId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["isAuthenticated"]});
        },
        });
    
    const invalidateUserProfile = () => {
        queryClient.invalidateQueries({queryKey: ["currentUserProfile"]});
    }

    const invalidateUserSettings = () => {
        queryClient.invalidateQueries({queryKey: ["currentUserSettings"]});
    }
    
    return {
        isAuthenticated,
        isLoadingIsAuthenticated: isAuthenticated === undefined,
        userProfile, isLoadingProfile,
        userSettings, isLoadingSettings,
        login,
        logout,
        externalAuthComplete,
        invalidateUserProfile,
        invalidateUserSettings
    };
};

export default useAuth;