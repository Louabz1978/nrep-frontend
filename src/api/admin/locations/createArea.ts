import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { Area, CreateAreaTypes } from "@/types/admin/location";

export type CreateAreaResult = Promise<AxiosRes<Area>>;

async function createArea(data: CreateAreaTypes): CreateAreaResult {
  const res = await axiosClient.post<AxiosRes<Area>>(`/areas`, data);
  return res?.data;
}

export default createArea;
