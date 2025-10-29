import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { User } from "@/types/global/user";

export type GetAllBrokersProps = {
  queryParams?: SearchParams;
};
export type GetAllBrokersResult = Promise<AxiosRes<PaginationData<User[]>>>;

async function getAllBrokers({
  queryParams,
}: GetAllBrokersProps = {}): GetAllBrokersResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<User[]>>>(
    `/users/`,
    {
      params: {
        ...queryParams,
        roles: "broker",
        page: queryParams?.page ?? 1,
      },
    }
  );

  const filtered = res.data.data.filter(
    (user) => user.roles?.includes("broker") || true
  );

  return {
    ...res.data,
    data: filtered,
  };
}

export default getAllBrokers;
