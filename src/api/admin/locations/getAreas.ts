import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";
import type { Area } from "@/types/admin/location";

export type GetAreasProps = {
  queryParams?: Record<string, string>;
};

export type GetAreasResult = Promise<
  {
    message?: string;
  } & PaginationData<Area[]>
>;

async function getAreas({ queryParams }: GetAreasProps = {}): GetAreasResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<Area[]>>>(
    `/areas/`,
    {
      params: {
        ...queryParams,
        // --- FIX ---
        // Get the 'page' property from queryParams, or default to 1
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}

export default getAreas;
