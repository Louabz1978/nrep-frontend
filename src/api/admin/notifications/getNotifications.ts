import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";

export interface Notification {
  id: number;
  title: string;
  body: string;
  created_at: string;
  recipient_id?: number;
}

export type GetNotificationsParams = {
  search?: string;
  perPage?: number;
  page?: number;
};

async function getNotifications(
  params: GetNotificationsParams = {}
): Promise<AxiosRes<PaginationData<Notification[]>>> {
  const res = await axiosClient.get<AxiosRes<PaginationData<Notification[]>>>(
    "/admin/notifications/",
    {
      params,
    }
  );

  return res.data;
}

export default getNotifications;
