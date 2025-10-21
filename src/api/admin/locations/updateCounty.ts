import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { County, UpdateCounty } from "@/types/admin/location";

export type UpdateCountyProps = {
  id: number;
  data: UpdateCounty;
};

export type UpdateCountyResult = Promise<AxiosRes<County>>;

async function updateCounty({
  id,
  data,
}: UpdateCountyProps): UpdateCountyResult {
  const res = await axiosClient.put<AxiosRes<County>>(`/counties/${id}/`, data);
  return res?.data;
}

export default updateCounty;
