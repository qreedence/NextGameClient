import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfileDTO } from "../apiclient/models/UserProfileDTO";
import { useStore } from "../stores/useStore";
import { AuthService } from "../apiclient/services/AuthService";
import { ApiError, LoginDTO, RegisterDTO } from "../apiclient";
import { useEffect } from "react";
import useGetNotifications from "./useGetNotifications";

const useAuth = () => {
  const queryClient = useQueryClient();
  const { invalidateNotifications } = useGetNotifications();
  const { isAuthenticated: storedIsAuthenticated, setAuthenticated } =
    useStore();

  //fetch data for isAuthenticated
  const { data: isAuthenticated } = useQuery<boolean, Error>({
    queryKey: ["isAuthenticated"],
    queryFn: async () => {
      return await AuthService.ping();
    },
  });

  //update store, maybe remove this
  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setAuthenticated(isAuthenticated);
    }
  }, [isAuthenticated, storedIsAuthenticated, setAuthenticated]);

  //fetch data for userProfile
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery<
    UserProfileDTO,
    Error
  >({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      return await AuthService.getUserProfile();
    },
    enabled: isAuthenticated === true,
  });

  //login
  const { mutate: login } = useMutation<void, Error, LoginDTO>({
    mutationFn: async (loginDTO: LoginDTO) => {
      return await AuthService.loginUser(loginDTO);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAuthenticated"] });
      invalidateNotifications();
    },
  });

  //logout
  const { mutate: logout } = useMutation<void, Error>({
    mutationFn: async () => {
      return await AuthService.logoutUser();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAuthenticated"] });
    },
  });

  //register
  const {
    mutate: register,
    isPending: isPendingRegister,
    isSuccess: isSuccessRegister,
    error: registerError,
  } = useMutation<void, Error, RegisterDTO>({
    mutationFn: async (registerDTO: RegisterDTO) => {
      try {
        return await AuthService.registerUser(registerDTO);
      } catch (err) {
        if (err instanceof ApiError && err.body) {
          const error = err.body.map(
            (e: { description: string }) => e.description
          );
          console.log(error);
          throw Error(error);
        }
      }
    },
  });

  //complete externalAuth
  const { mutate: externalAuthComplete } = useMutation<string, Error, string>({
    mutationFn: async (tokenId: string) => {
      localStorage.setItem("isLoggingIn", "true");
      return await AuthService.externalAuthComplete(tokenId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAuthenticated"] });
    },
  });

  const invalidateUserProfile = () => {
    queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
  };

  return {
    isAuthenticated,
    isLoadingIsAuthenticated: isAuthenticated === undefined,
    userProfile,
    isLoadingProfile,
    login,
    logout,
    externalAuthComplete,
    invalidateUserProfile,
    register,
    registerError,
    isPendingRegister,
    isSuccessRegister,
  };
};

export default useAuth;
