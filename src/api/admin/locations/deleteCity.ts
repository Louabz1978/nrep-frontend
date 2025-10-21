import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type DeleteCityProps = {
  id: number;
};

export type DeleteCityResult = Promise<AxiosRes<null>>;

async function deleteCity({ id }: DeleteCityProps): DeleteCityResult {
  const res = await axiosClient.delete<AxiosRes<null>>(`/cities/${id}/`);
  return res?.data;
}

export default deleteCity;
