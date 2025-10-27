import axiosClient from "@/libs/axios/axios-client";
import type { PropertyStatsResponse } from "@/types/website/reports";

interface GetMarketMovementProps {
  queryParams: {
    city_id: string;
    area_id: string;
    year: number;
    month: number;
  };
}

export default async function getMarketMovement({
  queryParams,
}: GetMarketMovementProps): Promise<PropertyStatsResponse> {
  const { city_id, area_id, year, month } = queryParams ?? {};

  const res = await axiosClient.get<PropertyStatsResponse>(
    "/report/get_property_stats/",
    {
      params: { city_id, area_id, year, month, t: Date.now() }, // ✅ add timestamp to bypass browser caching
    }
  );

  return res.data;
}
