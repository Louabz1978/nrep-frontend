import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";
import type { Listing } from "@/types/website/listings";

export interface GetCompatiblePropertiesProps {
  mls?: string;
  queryParams?: Record<string, string>;
}

export interface GetCompatiblePropertiesResult {
  data: PaginationData<Listing[]>;
}

async function getCompatibleProperties({
  mls,
  queryParams,
}: GetCompatiblePropertiesProps): Promise<GetCompatiblePropertiesResult> {
  const res = await axiosClient.get<AxiosRes<PaginationData<Listing[]>>>(
    `/property/compatible/${mls}`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );

  return {
    data: res?.data?.data || { 
      data: [], 
      pagination: {
        current_page: 1,
        per_page: 10,
        total: 0,
        page: 1,
        total_pages: 0,
      }
    },
  };
}

export default getCompatibleProperties;
