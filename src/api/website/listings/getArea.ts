import axiosClient from "@/libs/axios/axios-client";

export interface GetAreaRequest {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface GetAreaResponse {
  data: Array<{ value: string; label: string }>;
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    page: number;
    total_pages: number;
  };
}

async function getArea(
  params: GetAreaRequest = {}
): Promise<GetAreaResponse> {
  const res = await axiosClient.get(`listings/area`, { params });
  return res?.data as GetAreaResponse;
}

export default getArea;
