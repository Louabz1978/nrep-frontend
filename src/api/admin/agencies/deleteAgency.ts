import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type DeleteAgencyProps = { agency_id: number };
export type DeleteAgencyResult = Promise<AxiosRes<string>>;

async function deleteAgency({ agency_id }: DeleteAgencyProps): DeleteAgencyResult {
  const res = await axiosClient.delete<AxiosRes<string>>(`/agencies/${agency_id}`);
  return res?.data;
}

export default deleteAgency;


