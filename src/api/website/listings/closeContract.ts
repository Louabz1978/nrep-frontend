import axiosClient from "@/libs/axios/axios-client";
import type {
  closeContractProps,
  updateListingResult,
} from "@/types/website/listings";

// update listing api call function,
// gets: listing new data, id of listing
async function closeContract({
  mls,
  buyer_agent,
  buyer_agent_commission,
  closing_date,
  closing_price,
  seller_agent_commission,
}: closeContractProps): updateListingResult {
  const res = await axiosClient.put(`/property/close/${mls}`, {
    buyer_agent,
    buyer_agent_commission,
    closing_date,
    closing_price,
    seller_agent_commission,
  });

  // return { ...(res?.data ?? {}), id: mls };

  return { ...(res?.data ?? {}), id: mls };
}

export default closeContract;
