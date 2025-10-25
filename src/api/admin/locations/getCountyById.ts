import axiosClient from "@/libs/axios/axios-client";
import type { City } from "@/types/admin/location";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";

interface GetCountyProps {
  id: number;
}
export type GetCountyResult = Promise<AxiosRes<PaginationData<City[]>>>;

async function getCountyById({ id }: GetCountyProps): GetCountyResult {
  const res = await axiosClient.get(`counties/${id}`);

  return res?.data;
}

export default getCountyById;
