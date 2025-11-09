import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";
import type { Listing } from "@/types/website/listings";

export interface GetFavoritePropertiesProps {
  queryParams?: Record<string, string | number>;
}

export type GetFavoritePropertiesResult = Promise<
  {
    message?: string;
  } & PaginationData<Listing[]>
>;

// get favorite properties api call function
// gets: query params (optional)
// returns: paginated list of favorite properties
async function getFavoriteProperties({
  queryParams = {},
}: GetFavoritePropertiesProps = {}): GetFavoritePropertiesResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<Listing[]>>>(
    `/end-user/favorite-properties`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );

  return res?.data;
}

export default getFavoriteProperties;
