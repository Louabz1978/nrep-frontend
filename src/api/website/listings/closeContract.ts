import { PropertyStatus } from "@/data/global/select";
import axiosClient from "@/libs/axios/axios-client";
import type {
  closeContractProps,
  updateListingResult,
} from "@/types/website/listings";
import createFormData from "@/utils/createFormData";

// update listing api call function,
// gets: listing new data, id of listing
async function closeContract({
  mls,
  id,
}: closeContractProps): updateListingResult {
  // const res = await axiosClient.put(`/contracts/contract/close/${mls}`);

  // return { ...(res?.data ?? {}), id: mls };

  const formData = createFormData({ status: PropertyStatus.CLOSED });

  const res = await axiosClient.put(`property/${id}`, formData);

  return { ...(res?.data ?? {}), id };
}

export default closeContract;
