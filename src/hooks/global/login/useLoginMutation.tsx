import loginFunction from "@/api/global/login/login";
import MESSAGES from "@/data/global/messages";
import type { LoginFormType } from "@/data/global/LoginFormSchema";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, type To } from "react-router-dom";
import { toast } from "sonner";

function useLoginMutation() {
  // navigate method
  const navigate = useNavigate();

  // login mutation
  const login = useMutation({
    mutationFn: loginFunction,
    onSuccess: () => {
      navigate(-1 as To, { replace: true });
    },
  });

  // handle submit login form
  // gets: submitted data
  async function handleLogin(data: LoginFormType) {
    toast.promise(login.mutateAsync({ data }), {
      loading: MESSAGES?.login?.loading,
      // change the toast status and message when successfully response
      success: MESSAGES?.login?.success,
      error: (error) => {
        //toast the api returned errors
        return showApiErrors(error);
      },
    });
  }

  return {
    login,
    handleLogin,
  };
}

export default useLoginMutation;
