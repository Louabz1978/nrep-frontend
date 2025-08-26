import axiosClient from "@/libs/axios/axios-client";

export interface GetCitiesRequest {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface GetCitiesResponse {
  data: Array<{ value: string; label: string }>;
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    page: number;
    total_pages: number;
  };
}

async function getCities(
  params: GetCitiesRequest = {}
): Promise<GetCitiesResponse> {
  const res = await axiosClient.get(`listings/cities`, { params });
  return res?.data as GetCitiesResponse;
}

export default getCities;
