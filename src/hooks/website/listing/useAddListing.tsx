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
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.listings.myListings] })
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
      trans_type: submitData?.trans_type?.value,
      sellers: submitData?.sellers?.map((item) => item?.consumer_id as string),
      country: submitData?.country?.value,
      livable: submitData?.livable,
      county: submitData?.country?.title,
      city: submitData?.city?.title,
      area: submitData?.area?.title,
      property_type: submitData?.property_type?.value,
      status: submitData?.status?.value,
      water: submitData?.water?.value,
      fan_number: submitData?.hasFans ? submitData?.fan_number : 0,
      balcony: submitData?.hasBalcony ? submitData?.balcony : 0,
      photos: submitData?.photos
        ?.filter((item) => item?.mode != "delete")
        ?.map((item) => (item as { path: string })?.path),
      metadata: JSON.stringify([]),
      main_photo: (
        submitData?.photos?.find((item) => item?.isMain)?.path as File
      )?.name,
      owner_id: 1,
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
