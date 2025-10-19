import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { Area } from "@/types/admin/location";

export type GetAreasProps = {
  queryParams?: SearchParams & {
    name?: string | null;
    city_id?: number | null;
    county_id?: number | null;
    created_by?: number | null;
  };
};

export type GetAreasResult = Promise<AxiosRes<PaginationData<Area[]>>>;

async function getAreas({ queryParams }: GetAreasProps = {}): GetAreasResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<Area[]>>>(
    `/areas/`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}

export default getAreas;
