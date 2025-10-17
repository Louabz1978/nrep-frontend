import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { User } from "@/types/global/user";
export type GetAgenciesHistoryProps = {
  queryParams?: SearchParams;
};
export type GetAgenciesHistoryResult = Promise<
  AxiosRes<PaginationData<User[]>>
>;
export default async function getAgenciesHistory({
  queryParams,
}: GetAgenciesHistoryProps): GetAgenciesHistoryResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<User[]>>>(
    `/agencies-history`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}
