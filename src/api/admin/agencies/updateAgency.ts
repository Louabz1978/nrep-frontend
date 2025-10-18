import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { UpdateAgencyPayload } from "@/types/admin/agency";

export type UpdateAgencyProps = { agency_id: number; payload: UpdateAgencyPayload };
export type UpdateAgencyResult = Promise<AxiosRes<string>>;

async function updateAgency({ agency_id, payload }: UpdateAgencyProps): UpdateAgencyResult {
  const res = await axiosClient.put<AxiosRes<string>>(`/agencies/${agency_id}`, payload);
  return res?.data;
}

export default updateAgency;


