import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { User } from "@/types/global/user";
export type GetExpectedPriceProps = {
  queryParams?: SearchParams;
};
export type GetExpectedPriceResult = Promise<
  AxiosRes<PaginationData<User[]>>
>;
export default async function getExpectedPrice({
  queryParams,
}: GetExpectedPriceProps): GetExpectedPriceResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<User[]>>>(
    `/expected-price`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}
