import axiosClient from "@/libs/axios/axios-client";
import type {
  updateListingProps,
  updateListingResult,
} from "@/types/website/listings";

// update listing api call function,
// gets: listing new data, id of listing
async function updateListing({
  data,
  id,
}: updateListingProps): updateListingResult {
  const res = await axiosClient.post(`property/${id}`, data);

  return { ...(res?.data ?? {}), id };
}

export default updateListing;
