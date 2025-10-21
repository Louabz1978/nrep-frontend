import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { County, CreateCountyTypes } from "@/types/admin/location";

export type CreateCountyResult = Promise<AxiosRes<County>>;

async function createCounty(data: CreateCountyTypes): CreateCountyResult {
  const res = await axiosClient.post<AxiosRes<County>>(`/counties/`, data);
  return res?.data;
}

export default createCounty;
