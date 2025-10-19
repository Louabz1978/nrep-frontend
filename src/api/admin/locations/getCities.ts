import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { City } from "@/types/admin/location";

export type GetCitiesProps = {
  queryParams?: SearchParams & {
    name?: string | null;
    county_id?: number | null;
    created_by?: number | null;
  };
};

export type GetCitiesResult = Promise<AxiosRes<PaginationData<City[]>>>;

async function getCities({
  queryParams,
}: GetCitiesProps = {}): GetCitiesResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<City[]>>>(
    `/cities/`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}

export default getCities;
