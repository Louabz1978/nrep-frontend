import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type DeleteCountyProps = {
  id: number;
};

export type DeleteCountyResult = Promise<AxiosRes<null>>;

async function deleteCounty({ id }: DeleteCountyProps): DeleteCountyResult {
  const res = await axiosClient.delete<AxiosRes<null>>(`/counties/${id}/`);
  return res?.data;
}

export default deleteCounty;
