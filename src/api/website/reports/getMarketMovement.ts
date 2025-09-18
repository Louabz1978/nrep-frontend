import axiosClient from "@/libs/axios/axios-client";
import type { PropertyStatsResponse, QueryParams } from "@/types/website/reports";

interface GetMarketMovementProps {
  queryParams: QueryParams & { 
    city?: string; 
    area?: string; 
    month?: number; 
    year?: number; 
  };
}

export default async function getMarketMovement({ queryParams }: GetMarketMovementProps) {
  const res = await axiosClient.get<PropertyStatsResponse>(`/get_property_stats/`, {
    params: { ...queryParams },
  });
  console.log("queryParams", queryParams);
  console.log("res market movement", res);
  return res;
}
