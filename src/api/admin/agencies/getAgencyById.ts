import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { Agency } from "@/types/admin/agency";

export type GetAgencyByIdProps = { agency_id: number };
export type GetAgencyByIdResult = Promise<AxiosRes<Agency>>;

async function getAgencyById({ agency_id }: GetAgencyByIdProps): GetAgencyByIdResult {
  const res = await axiosClient.get<AxiosRes<Agency>>(`/agencies/${agency_id}`);
  return res?.data;
}

export default getAgencyById;


