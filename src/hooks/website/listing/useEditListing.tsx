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
    const images_urls = submitData?.photos
      ?.filter((item) => item?.mode == "normal")
      ?.map(
        (item) =>
          (item as { path: string })?.path?.split("/")?.[
            (item as { path: string })?.path?.split("/")?.length - 1
          ]
      );

    const data = {
      ...(submitData ?? {}),
      trans_type: submitData?.trans_type?.value,
      sellers: submitData?.sellers
        ?.map((item) => item?.consumer_id as string)
        ?.join(","),
      country: undefined,
      county_id: submitData?.county_id?.county_id,
      city_id: submitData?.city_id?.city_id,
      area_id: submitData?.area_id?.area_id,
      property_type: submitData?.property_type?.value,
      status: submitData?.status?.value,
      water: submitData?.water?.value || null,
      photos: submitData?.photos
        ?.filter((item) => item?.mode != "delete" && item?.mode !== "normal")
        ?.map((item) => (item as { path: string })?.path),
      preserve_images: images_urls?.length ? images_urls : "",
      fan_number: submitData?.hasFans ? submitData?.fan_number : 0,
      balcony: submitData?.hasBalcony ? submitData?.balcony : 0,
      metadata: JSON.stringify([]),
      longitude: Number(submitData?.longitude),
      latitude: Number(submitData?.latitude),
      livable: submitData.livable,
      main_photo: mainImageName ?? "",
      owner_id: 1,
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
