import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { User } from "@/types/global/user";
export type GetRealtorHistoryProps = {
  queryParams?: SearchParams;
};
export type GetRealtorHistoryResult = Promise<AxiosRes<PaginationData<User[]>>>;
export default async function getRealtorHistory({
  queryParams,
}: GetRealtorHistoryProps): GetRealtorHistoryResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<User[]>>>(
    `/realtor-history`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}
