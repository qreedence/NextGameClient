import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiError, AuthService } from "@/apiclient";
import { ResetPasswordDTO } from "@/types/ResetPasswordDTO";

const useResetPassword = (tokenId?: string | undefined) => {
  //check tokenId of PasswordResetToken
  const {
    data: checkPasswordResetToken,
    isPending: checkingPasswordResetToken,
  } = useQuery({
    queryKey: ["passwordResetTokenValidity", tokenId],
    queryFn: async ({ queryKey }) => {
      const [, tokenId] = queryKey;
      return await AuthService.checkPasswordResetToken(tokenId);
    },
    enabled: !!tokenId,
  });

  //send forgot password email
  const {
    mutate: forgotPassword,
    isPending: isPendingForgotPassword,
    isSuccess: isSuccessForgotPassword,
  } = useMutation<string, Error, string>({
    mutationFn: async (email: string) => {
      return AuthService.forgotPassword(email);
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

  //reset password
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
  } = useMutation<ResetPasswordDTO, Error, ResetPasswordDTO>({
    mutationFn: async (resetPasswordDTO: ResetPasswordDTO) => {
      return AuthService.resetPassword(
        resetPasswordDTO.tokenId,
        resetPasswordDTO.password
      );
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
    checkPasswordResetToken,
    checkingPasswordResetToken,
    forgotPassword,
    isPendingForgotPassword,
    isSuccessForgotPassword,
    resetPassword,
    isPending,
    isSuccess,
  };
};

export default useResetPassword;
