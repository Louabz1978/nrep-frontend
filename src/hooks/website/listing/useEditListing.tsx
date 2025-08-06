import updateListing from "@/api/website/listings/updateListing";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { ListingFormType } from "@/data/website/schema/ListingFormSchema";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useEditListings = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // navigate method
  const navigate = useNavigate();

  // handle edit listing
  const editListing = useMutation({
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

      // navigate to all listings page
      navigate("/listing/all-listings");
    },
  });

  // handle submit edit listing form
  async function handleEditListing(
    submitData: ListingFormType,
    id: number
    // forms:
  ) {
    // preparing data to submit
    const mainImage = submitData?.photos?.find((item) => item?.isMain);
    const mainImageName =
      typeof mainImage?.path == "string"
        ? mainImage?.path?.split("/")?.[mainImage?.path?.split("/")?.length - 1]
        : (mainImage?.path as File)?.name;
    const data = {
      ...(submitData ?? {}),
      country: submitData?.country?.value,
      county: submitData?.country?.value,
      city: submitData?.city?.value,
      property_type: submitData?.property_type?.value,
      status: submitData?.status?.value,
      water: submitData?.water?.value,
      photos: submitData?.photos
        ?.filter((item) => item?.mode != "delete" && item?.mode !== "normal")
        ?.map((item) => (item as { path: string })?.path),
      images_urls: submitData?.photos
        ?.filter((item) => item?.mode == "normal")
        ?.map((item) => (item as { path: string })?.path),
      metadata: JSON.stringify([]),
      longitude: Number(submitData?.longitude),
      latitude: Number(submitData?.latitude),
      mainImage: mainImageName ?? "",
      ac: 1,
      owner_id: 13,
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
