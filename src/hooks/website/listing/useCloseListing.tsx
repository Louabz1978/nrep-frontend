import closeContract from "@/api/website/listings/closeContract";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCloseListings = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // handle close listing
  const closeListing = useMutation({
    mutationFn: closeContract,
    onSuccess: (res) => {
      // invalidate listings query
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.listings.query] })
        .catch(console.error);
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.listings.myListings] })
        .catch(console.error);
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.listings.details, res?.id] })
        .catch(console.error);
    },
  });

  // handle submit close listing form
  async function handleCloseListing(mls: number | null) {
    // toaster
    toast.promise(closeListing.mutateAsync({ mls }), {
      loading: MESSAGES?.listing?.close?.loading,
      success: MESSAGES?.listing?.close?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleCloseListing,
    closeListing,
  };
};
