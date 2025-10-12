import { useMutation } from "@tanstack/react-query";
import { resetPassword, type ResetPasswordRequest } from "@/api/global/resetPassword/resetPassword";
import { showApiErrors } from "@/utils/showApiErrors";

export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
    onError: (error: any) => {
      showApiErrors(error);
    },
  });

  const handleResetPassword = async (data: ResetPasswordRequest) => {
    try {
      await mutation.mutateAsync(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    resetPassword: mutation,
    handleResetPassword,
  };
};
