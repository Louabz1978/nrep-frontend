import loginFunction from "@/api/global/login/login";
import MESSAGES from "@/data/global/messages";
import type { LoginFormType } from "@/data/global/LoginFormSchema";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import secureLocalStorage from "react-secure-storage";
import { HOME_PAGE, useUser } from "@/stores/useUser";
import { jwtDecode } from "jwt-decode";
import type { User, UserType } from "@/types/global/user";

function useLoginMutation() {
  // navigate method
  const navigate = useNavigate();

  // user store
  const { setUser } = useUser();

  // login mutation
  const login = useMutation({
    mutationFn: loginFunction,
    onSuccess: async ({ user }) => {
      const data: User = jwtDecode(user.access_token);
      secureLocalStorage.setItem("ACCESS_TOKEN", { data: user?.access_token });
      secureLocalStorage.setItem("REFRESH_TOKEN", {
        data: user?.refresh_token,
      });
      secureLocalStorage.setItem("USER", { data: data });
      // Store login timestamp
      const loginTime = Date.now();
      secureLocalStorage.setItem("LOGIN_TIME", { data: loginTime.toString() });

      setUser(data);
      navigate(HOME_PAGE[data?.roles?.[0] as UserType]);
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
