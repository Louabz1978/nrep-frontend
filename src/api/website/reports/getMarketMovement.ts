import axiosClient from "@/libs/axios/axios-client";
import type { GetMarketMovementResponse } from "@/types/website/reports";

interface GetMarketMovementProps {
  queryParams: {
    period: string; // e.g. "1 month"
    area: string;   // e.g. "الإنشاءات"
  };
}

export default async function getMarketMovement({
  queryParams,
}: GetMarketMovementProps): Promise<GetMarketMovementResponse> {
  const { period, area } = queryParams ?? {};

  if (!period || !area) {
    throw new Error("Both `period` and `area` are required for getMarketMovement API.");
  }

  const res = await axiosClient.get<GetMarketMovementResponse>("/market_watcher/", {
    params: { period, area },
  });
  console.log("results "+res)

  return res.data;
}

