import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type CreateNotificationData = {
  recipient_id?: number;
  title: string;
  body: string;
};

export type CreateNotificationResult = Promise<AxiosRes<{ id: number }>>;

async function createNotification(
  data: CreateNotificationData
): CreateNotificationResult {
  const res = await axiosClient.post<AxiosRes<{ id: number }>>(
    `/notifications`,
    data
  );
  return res?.data;
}

export default createNotification;
