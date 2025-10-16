import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { Agency } from "@/types/admin/agency";

export type GetAgenciesProps = {
  queryParams?: SearchParams & {
    name?: string | null;
    email?: string | null;
    phone_number?: string | null;
    broker_id?: number | null;
    created_by?: number | null;
    city?: string | null;
  };
};

export type GetAgenciesResult = Promise<AxiosRes<PaginationData<Agency[]>>>;

async function getAgencies({ queryParams }: GetAgenciesProps = {}): GetAgenciesResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<Agency[]>>>(
    `/agencies/`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}

export default getAgencies;


