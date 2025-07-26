import axiosClient from "@/libs/axios/axios-client";
import type {
  removeListingProps,
  removeListingResult,
} from "@/types/website/listings";

// remove listing api call function,
// gets: listing id
async function removeListing({ id }: removeListingProps): removeListingResult {
  const res = await axiosClient.delete(`property/${id}`);

  return res?.data;
}

export default removeListing;
