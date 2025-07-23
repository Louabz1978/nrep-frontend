import axiosClient from "@/libs/axios/axios-client";
import type {
  createListingProps,
  createListingResult,
} from "@/types/website/listings";
import createFormData from "@/utils/createFormData";

// create listing api call function,
// gets: listing data
async function createListing({
  data,
}: createListingProps): createListingResult {
  const formData = createFormData({ photos: data?.photos });

  const res = await axiosClient.post(`property`, formData, {
    params: data,
  });

  return res?.data;
}

export default createListing;
