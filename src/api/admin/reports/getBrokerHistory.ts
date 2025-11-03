import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { User } from "@/types/global/user";

export type GetBrokerHistoryProps = {
  start_month: number;
  start_year: number;
  end_month: number;
  end_year: number;
  search: string;
  queryParams?: SearchParams;
};

export type GetBrokerHistoryResult = Promise<AxiosRes<PaginationData<User[]>>>;

export default async function getBrokerHistory({
  start_month,
  start_year,
  end_month,
  end_year,
  search,
  queryParams,
}: GetBrokerHistoryProps): GetBrokerHistoryResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<User[]>>>(
    `report/agents/detailed`,
    {
      params: {
        start_month,
        start_year,
        end_month,
        end_year,
        search,
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}
