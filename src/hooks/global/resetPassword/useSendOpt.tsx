import sendOptCodeFunction from "@/api/global/resetPassword/sendOptCode";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useSendOpt() {
  // verify OTP code mutation
  const sendOpt = useMutation({
    mutationFn: sendOptCodeFunction,
    onSuccess: () => {
      // Success is handled in the toast promise
    },
  });

  // handle verify OTP code
  // gets: email address and otp code
  async function handleSendOpt(email: string, otp: string) {
    const loadingToast = toast.loading("جار التحقق من الكود...");

    try {
      const result = await sendOpt.mutateAsync({ email, otp });
      toast.dismiss(loadingToast);
      toast.success("تم التحقق من الكود بنجاح!");
      return result;
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(showApiErrors(error));
      throw error;
    }
  }

  return {
    sendOpt,
    handleSendOpt,
  };
}

export default useSendOpt;
