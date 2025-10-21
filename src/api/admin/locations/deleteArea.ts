import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type DeleteAreaProps = {
  id: number;
};

export type DeleteAreaResult = Promise<AxiosRes<null>>;

async function deleteArea({ id }: DeleteAreaProps): DeleteAreaResult {
  const res = await axiosClient.delete<AxiosRes<null>>(`/areas/${id}/`);
  return res?.data;
}

export default deleteArea;
