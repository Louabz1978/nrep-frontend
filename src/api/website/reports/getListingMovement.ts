import axiosClient from "@/libs/axios/axios-client";
import type { GetListingMovementResponse,QueryParams } from "@/types/website/reports";

interface IGetListingMovement {
  queryParams: QueryParams & { month?: string; year?: string };
}

export default async function getListingMovement({ queryParams }: IGetListingMovement) {
  const res = await axiosClient.get<GetListingMovementResponse>(`/listing-movement`, {
    params: { ...queryParams },
  });
  return res;
}
