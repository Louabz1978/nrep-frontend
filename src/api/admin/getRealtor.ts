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
    `/realtors/`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );
  return res?.data;
}

export default getAllRealtors;
