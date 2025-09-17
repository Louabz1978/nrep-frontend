import axiosClient from "@/libs/axios/axios-client";
import type {
  closeContractProps,
  updateListingResult,
} from "@/types/website/listings";

// update listing api call function,
// gets: listing new data, id of listing
async function closeContract({ mls }: closeContractProps): updateListingResult {
  const res = await axiosClient.put(`/contracts/contract/close/${mls}`);

  return { ...(res?.data ?? {}), id: mls };
}

export default closeContract;
