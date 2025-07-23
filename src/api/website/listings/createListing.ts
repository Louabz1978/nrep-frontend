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
  const formData = createFormData(data);

  const res = await axiosClient.post(`property`, formData);

  return res?.data;
}

export default createListing;
