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

interface GetNotificationsParams {
  page: number;
}

export default async function getNotifications({
  page = 1,
}: GetNotificationsParams): Promise<GetNotificationsApiResponse> {

  const res = await axiosClient.get<GetNotificationsApiResponse>(
    "/notifications",
    {
      params: {
        page: page,
      },
    }
  );
  return res.data;
}
