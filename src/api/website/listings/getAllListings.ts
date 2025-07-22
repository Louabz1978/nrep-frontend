import axiosClient from "@/libs/axios/axios-client";
import type {
  getAllListingsProps,
  getAllListingsResult,
} from "@/types/website/listings";

// get listing list api call function,
// gets: search params
// returns: list of listing
async function getAllListings({
  queryParams,
}: getAllListingsProps): getAllListingsResult {
  const res = await axiosClient.get(`property`, {
    params: {
      ...queryParams,
      page: queryParams?.page ?? 1,
    },
  });

  return res?.data;
}

export default getAllListings;
