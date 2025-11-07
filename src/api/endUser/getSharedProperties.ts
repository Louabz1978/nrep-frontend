import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";
import type { Listing } from "@/types/website/listings";

export interface GetSharedPropertiesProps {
  queryParams?: Record<string, string | number>;
}

export type GetSharedPropertiesResult = Promise<
  {
    message?: string;
  } & PaginationData<Listing[]>
>;

// get shared properties api call function
// gets: query params (optional)
// returns: paginated list of shared properties
async function getSharedProperties({
  queryParams = {},
}: GetSharedPropertiesProps = {}): GetSharedPropertiesResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<Listing[]>>>(
    `/end-user/shared-properties`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );

  return res?.data;
}

export default getSharedProperties;
