import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type {
  getMyListingsProps,
  getMyListingsResult,
  Listing,
} from "@/types/website/listings";

// get listing list api call function,
// gets: search params
// returns: list of listing
async function getMyListings({
  queryParams,
}: getMyListingsProps): getMyListingsResult {
  const res = await axiosClient.get<AxiosRes<Listing[]>>(`property/my-properties`, {
    params: {
      ...queryParams,
      page: queryParams?.page ?? 1,
    },
  });

  return res?.data;
}

export default getMyListings;
