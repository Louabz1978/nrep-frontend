import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { City, CreateCityTypes } from "@/types/admin/location";

export type CreateCityResult = Promise<AxiosRes<City>>;

async function createCity(data: CreateCityTypes): CreateCityResult {
  const res = await axiosClient.post<AxiosRes<City>>(`/cities/`, data);
  return res?.data;
}

export default createCity;
