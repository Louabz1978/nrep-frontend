import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { User } from "@/types/global/user";
export type GetBrokerHistoryProps = {
  queryParams?: SearchParams;
};
export type GetBrokerHistoryResult = Promise<AxiosRes<PaginationData<User[]>>>;
export default async function getBrokerHistory({
  queryParams,
}: GetBrokerHistoryProps): GetBrokerHistoryResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<User[]>>>(
    `report/agents/detailed`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}
