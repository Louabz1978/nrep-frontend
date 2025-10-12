import sendResetCodeFunction from "@/api/global/resetPassword/sendResetCode";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useSendCode() {
  // send reset code mutation
  const sendCode = useMutation({
    mutationFn: sendResetCodeFunction,
    onSuccess: () => {
      // Success is handled in the toast promise
    },
  });

  // handle send reset code
  // gets: email address
  async function handleSendCode(email: string) {
    try {
      const loadingToast = toast.loading("جار إرسال الكود...");
      const result = await sendCode.mutateAsync({ email });
      toast.dismiss(loadingToast);
      toast.success("تم إرسال الكود بنجاح!");
      return result;
    } catch (error) {
      toast.error(showApiErrors(error));
      throw error;
    }
  }

  return {
    sendCode,
    handleSendCode,
  };
}

export default useSendCode;
