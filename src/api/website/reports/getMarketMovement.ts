import axiosClient from "@/libs/axios/axios-client";
import type { PropertyStatsResponse } from "@/types/website/reports";

interface GetMarketMovementProps {
  queryParams: {
    city: string;
    area: string;
    year: number;
    month: number;
  };
}

export default async function getMarketMovement({
  queryParams,
}: GetMarketMovementProps): Promise<PropertyStatsResponse> {
  const { city, area, year, month } = queryParams ?? {};

  if (!city || !area || !year || !month) {
    throw new Error("All parameters are required for getMarketMovement API.");
  }

  const res = await axiosClient.get<PropertyStatsResponse>("/get_property_stats/", {
    params: { city, area, year, month, t: Date.now() }, // ✅ add timestamp to bypass browser caching
  });

  return res.data;
}
