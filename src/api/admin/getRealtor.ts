import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { User } from "@/types/global/user";

export type GetAllRealtorsProps = {
  queryParams?: SearchParams;
};

export type GetAllRealtorsResult = Promise<AxiosRes<PaginationData<User[]>>>;
async function getAllRealtors({ queryParams }: GetAllRealtorsProps = {}): GetAllRealtorsResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<User[]>>>(
    `/users/`,
    {
      params: {
        ...queryParams,
        roles: "realtor",
        page: queryParams?.page ?? 1,
      },
    }
  );
  const filtered = res.data.data.filter((user) =>
    user.roles?.includes("realtor")
  );

  return {
    ...res.data,
    data: filtered,
  };
}

export default getAllRealtors;
