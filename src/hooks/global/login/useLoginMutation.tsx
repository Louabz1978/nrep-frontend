import loginFunction from "@/api/global/login/login";
import MESSAGES from "@/data/global/messages";
import type { LoginFormType } from "@/data/global/LoginFormSchema";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { replace } from "lodash";

function useLoginMutation() {
  // navigate method
  const navigate = useNavigate();

  // login mutation
  const login = useMutation({
    mutationFn: loginFunction,
    onSuccess: () => {
      navigate(-1, { replace: true });
    },
  });

  async function handleLogin(data: LoginFormType) {
    toast.promise(login.mutateAsync({ data }), {
      loading: MESSAGES?.templates?.add?.loading,
      // change the toast status and message when successfully response
      success: MESSAGES?.templates?.add?.success,
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
