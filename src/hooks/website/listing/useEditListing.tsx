import updateListing from "@/api/website/listings/updateListing";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { ListingFormType } from "@/data/website/schema/ListingFormSchema";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useEditListings = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // handle edit listing
  const editListing = useMutation({
    mutationFn: updateListing,
    onSuccess: (res) => {
      // invalidate listings query
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.listings.query] })
        .catch(console.error);
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.listings.details, res?.id] })
        .catch(console.error);
    },
  });

  // handle submit edit listing form
  async function handleEditListing(
    submitData: ListingFormType,
    id: number
    // forms:
  ) {
    // preparing data to submit
    const data = {
      ...(submitData ?? {}),
    };

    // toaster
    toast.promise(editListing.mutateAsync({ data, id }), {
      loading: MESSAGES?.listing?.edit?.loading,
      success: MESSAGES?.listing?.edit?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleEditListing,
    editListing,
  };
};
