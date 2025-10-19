import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { County } from "@/types/admin/location";

export type GetCountiesProps = {
  queryParams?: SearchParams & {
    name?: string | null;
    created_by?: number | null;
  };
};

export type GetCountiesResult = Promise<AxiosRes<PaginationData<County[]>>>;

async function getCounties({
  queryParams,
}: GetCountiesProps = {}): GetCountiesResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<County[]>>>(
    `/counties/`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}

export default getCounties;
