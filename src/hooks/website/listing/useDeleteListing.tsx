import removeListing from "@/api/website/listings/removeListing";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useDeleteListings = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // navigate method
  const navigate = useNavigate();

  // handle delete listing
  const deleteListing = useMutation({
    mutationFn: removeListing,
    onSuccess: () => {
      // invalidate listings query
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.listings.query] })
        .catch(console.error);
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.listings.myListings] })
        .catch(console.error);

      // navigate to all listings page
      // navigate("/listing/all-listings");
    },
  });

  // handle submit delete listing form
  async function handleDeleteListing(
    id: number
    // forms:
  ) {
    // toaster
    toast.promise(deleteListing.mutateAsync({ id }), {
      loading: MESSAGES?.listing?.delete?.loading,
      success: MESSAGES?.listing?.delete?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleDeleteListing,
    deleteListing,
  };
};
