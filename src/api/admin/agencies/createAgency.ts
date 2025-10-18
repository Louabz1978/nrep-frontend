import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { CreateAgencyTypes } from "@/types/admin/agency";
import createFormData from "@/utils/createFormData";

export type CreateAgencyResult = Promise<AxiosRes<string>>;

async function createAgency(props: CreateAgencyTypes): CreateAgencyResult {
  const formData = createFormData(props);

  const res = await axiosClient.post<AxiosRes<string>>(`/agencies/`, formData);
  return res?.data;
}

export default createAgency;


