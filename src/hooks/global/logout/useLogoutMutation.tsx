// hooks/useLogoutMutation.js

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

  // A helper function to clear local session data
  const clearLocalSession = () => {
    secureLocalStorage.removeItem("ACCESS_TOKEN");
    secureLocalStorage.removeItem("USER");
    secureLocalStorage.removeItem("REFRESH_TOKEN");
    secureLocalStorage.removeItem("LOGIN_TIME");
    setUser(null);
    navigate("/login");
  };

  // logout mutation
  const logout = useMutation({
    mutationFn: logoutFunction,
    onSuccess: () => {
      toast.success(MESSAGES?.logout?.success);
      clearLocalSession();
    },
    onError: (error) => {
      showApiErrors(error);
      clearLocalSession();
    },
  });

  // handle submit logout form
  async function handleLogout() {
    const accessTokenObj = secureLocalStorage.getItem(
      "ACCESS_TOKEN"
    ) as unknown as { data?: string } | null;
    const token =
      accessTokenObj && typeof accessTokenObj === "object"
        ? accessTokenObj.data
        : undefined;

    if (!token) {
      clearLocalSession();
      return;
    }

    // Call the mutation with the required variables.
    await logout.mutateAsync({
      token: String(token),
      type: "normal",
    });
  }

  return {
    // Return the loading state from the mutation itself
    isLoggingOut: logout.isPending,
    handleLogout,
  };
}

export default useLogoutMutation;
