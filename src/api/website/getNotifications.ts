import axiosClient from "@/libs/axios/axios-client";
import type { Notification } from "@/hooks/website/notificaions/useGetLiveNotifications";



export interface GetNotificationsApiResponse {
  data: Notification[];
  pagination?: {
    total_pages: number;
    current_page: number;
    per_page: number;
    total: number;
  };
}

export default async function getNotifications(): Promise<GetNotificationsApiResponse> {
  const res = await axiosClient.get<GetNotificationsApiResponse>("/notifications");
  return res.data;
}
