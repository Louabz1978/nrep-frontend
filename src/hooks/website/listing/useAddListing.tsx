import createListing from "@/api/website/listings/createListing";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { ListingFormType } from "@/data/website/schema/ListingFormSchema";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useAddListings = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // navigate method
  const navigate = useNavigate();

  // handle add listing
  const addListing = useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      // invalidate listings query
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.listings.query] })
        .catch(console.error);

      // navigate to all listings page
      navigate("/listing/all-listings");
    },
  });

  // handle submit add listing form
  async function handleAddListing(
    submitData: ListingFormType
    // forms:
  ) {
    // preparing data to submit
    const data = {
      ...(submitData ?? {}),
      country: submitData?.country?.value,
      county: submitData?.country?.value,
      area: submitData?.area_space,
      city: submitData?.city?.value,
      property_type: submitData?.property_type?.value,
      status: submitData?.status?.value,
      waterLine: submitData?.waterLine?.value,
      photos: submitData?.photos?.map(
        (item) => (item as { path: string })?.path
      ),
      owner_id: 13,
    };

    // toaster
    toast.promise(addListing.mutateAsync({ data }), {
      loading: MESSAGES?.listing?.add?.loading,
      success: MESSAGES?.listing?.add?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleAddListing,
    addListing,
  };
};
