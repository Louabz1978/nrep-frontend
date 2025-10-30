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
    `/report/cmr`,
    {
      params: {
        mls,
        ...queryParams,
      },
    }
  );

  console.log("✅ Response:", res.data);

  return {
    data: res?.data,
  };
}

export default getCompatibleProperties;
