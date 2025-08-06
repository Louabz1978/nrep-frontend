import axiosClient from "@/libs/axios/axios-client";
import type {
  updateListingProps,
  updateListingResult,
} from "@/types/website/listings";
import createFormData from "@/utils/createFormData";

// update listing api call function,
// gets: listing new data, id of listing
async function updateListing({
  data,
  id,
}: updateListingProps): updateListingResult {
  const formData = createFormData(data);
  if (!data?.water) formData.append("water", null);

  const res = await axiosClient.put(`property/${id}`, formData);

  return { ...(res?.data ?? {}), id };
}

export default updateListing;
