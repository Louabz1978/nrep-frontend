import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type {
  getAllListingsProps,
  getAllListingsResult,
  Listing,
} from "@/types/website/listings";

// get listing list api call function,
// gets: search params
// returns: list of listing
async function getAllListings({
  queryParams,
}: getAllListingsProps): getAllListingsResult {
  const res = await axiosClient.get<AxiosRes<Listing[]>>(`property`, {
    params: {
      ...queryParams,
      page: queryParams?.page ?? 1,
    },
  });

  return res?.data;
}

export default getAllListings;
