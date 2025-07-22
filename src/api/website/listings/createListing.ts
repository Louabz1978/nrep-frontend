import axiosClient from "@/libs/axios/axios-client";
import type {
  createListingProps,
  createListingResult,
} from "@/types/website/listings";

// create listing api call function,
// gets: listing data
async function createListing({
  data,
}: createListingProps): createListingResult {
  const res = await axiosClient.post(`property`, data);

  return res?.data;
}

export default createListing;
