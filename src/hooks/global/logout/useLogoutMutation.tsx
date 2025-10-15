import MESSAGES from "@/data/global/messages";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import secureLocalStorage from "react-secure-storage";
import { useUser } from "@/stores/useUser";
import logoutFunction from "@/api/global/logout/logout";

function useLogoutMutation() {
  // navigate method
  const navigate = useNavigate();

  // user store
  const { setUser } = useUser();

  // logout mutation
  const logout = useMutation({
    mutationFn: logoutFunction,
    onSuccess: async () => {
      secureLocalStorage.removeItem("ACCESS_TOKEN");
      secureLocalStorage.removeItem("USER");
      secureLocalStorage.removeItem("REFRESH_TOKEN");
      secureLocalStorage.removeItem("LOGIN_TIME"); // Clear timestamp
      setUser(null);
      navigate("/login");
    },
  });

  // handle submit logout form
  // gets: submitted data
  async function handleLogout() {
    toast.promise(logout.mutateAsync(), {
      loading: MESSAGES?.logout?.loading,
      // change the toast status and message when successfully response
      success: MESSAGES?.logout?.success,
      error: (error) => {
        //toast the api returned errors
        return showApiErrors(error);
      },
    });
  }

  return {
    logout,
    handleLogout,
  };
}

export default useLogoutMutation;
