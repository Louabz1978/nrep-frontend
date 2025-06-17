import subscribeFunction from "@/api/website/homeTest/subscribe";
import MESSAGES from "@/data/global/messages";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useItemsMutations() {
  // subscribe
  const subscribe = useMutation({
    mutationFn: subscribeFunction,
  });

  const handleSubscribe = async () => {
    toast.promise(subscribe.mutateAsync(), {
      loading: MESSAGES?.homeTest?.subscribe?.loading,
      // change the toast status and message when successfully response
      success: MESSAGES?.homeTest?.subscribe?.success,
      error: (error) => {
        //toast the api returned errors
        return showApiErrors(error);
      },
    });
  };

  return { subscribe, handleSubscribe };
}

export default useItemsMutations;
