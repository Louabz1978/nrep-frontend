import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { City, UpdateCity } from "@/types/admin/location";

export type UpdateCityProps = {
  id: number;
  data: UpdateCity;
};

export type UpdateCityResult = Promise<AxiosRes<City>>;

async function updateCity({ id, data }: UpdateCityProps): UpdateCityResult {
  const res = await axiosClient.put<AxiosRes<City>>(`/cities/${id}/`, data);
  return res?.data;
}

export default updateCity;
