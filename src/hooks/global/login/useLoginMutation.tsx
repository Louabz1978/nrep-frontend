import loginFunction from "@/api/global/login/login";
import MESSAGES from "@/data/global/messages";
import type { LoginFormType } from "@/data/global/LoginFormSchema";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, type To } from "react-router-dom";
import { toast } from "sonner";
import secureLocalStorage from "react-secure-storage";
import { useUser } from "@/stores/useUser";

function useLoginMutation() {
  // navigate method
  const navigate = useNavigate();

  // user store
  const { setUser } = useUser();

  // login mutation
  const login = useMutation({
    mutationFn: loginFunction,
    onSuccess: async ({ user }) => {
      secureLocalStorage.setItem("ACCESS_TOKEN", { data: user?.access_token });
      secureLocalStorage.setItem("USER", { data: user });
      setUser(user);
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
