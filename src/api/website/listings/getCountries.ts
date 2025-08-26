import axiosClient from "@/libs/axios/axios-client";

export interface GetCountriesRequest {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface GetCountriesResponse {
  data: Array<{ value: string; label: string }>;
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    page: number;
    total_pages: number;
  };
}

async function getCountries(
  params: GetCountriesRequest = {}
): Promise<GetCountriesResponse> {
  const res = await axiosClient.get(`listings/countries`, { params });
  return res?.data as GetCountriesResponse;
}

export default getCountries;
