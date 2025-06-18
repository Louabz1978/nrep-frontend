import subscribeFunction from "@/api/website/homeTest/subscribe";
import MESSAGES from "@/data/global/messages";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function useItemsMutations() {
  const { t } = useTranslation();

  // subscribe
  const subscribe = useMutation({
    mutationFn: subscribeFunction,
  });

  const handleSubscribe = async () => {
    toast.promise(subscribe.mutateAsync(), {
      loading: t(MESSAGES?.homeTest?.subscribe?.loading),
      // change the toast status and message when successfully response
      success: t(MESSAGES?.homeTest?.subscribe?.success),
      error: (error) => {
        //toast the api returned errors
        return showApiErrors(error, t as any);
      },
    });
  };

  return { subscribe, handleSubscribe };
}

export default useItemsMutations;
