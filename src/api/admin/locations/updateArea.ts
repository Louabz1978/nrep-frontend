import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { Area, UpdateArea } from "@/types/admin/location";

export type UpdateAreaProps = {
  id: number;
  data: UpdateArea;
};

export type UpdateAreaResult = Promise<AxiosRes<Area>>;

async function updateArea({ id, data }: UpdateAreaProps): UpdateAreaResult {
  const res = await axiosClient.put<AxiosRes<Area>>(`/areas/${id}/`, data);
  return res?.data;
}

export default updateArea;
