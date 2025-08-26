import updateListing from "@/api/website/listings/updateListing";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useEditListingsPartial = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // navigate method
  const navigate = useNavigate();

  // handle edit listing
  const editListingPartial = useMutation({
    mutationFn: updateListing,
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

  // handle submit edit listing form
  async function handleEditListingPartial(
    data: Record<string, string>,
    id: number,
    preventRoute?: boolean

    // forms:
  ) {
    // toaster
    toast.promise(editListingPartial.mutateAsync({ data, id }), {
      loading: MESSAGES?.listing?.edit?.loading,
      success: () => {
        if (!preventRoute)
          // navigate to all listings page
          navigate("/listing/all-listings");
        return MESSAGES?.listing?.edit?.success;
      },
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleEditListingPartial,
    editListingPartial,
  };
};
