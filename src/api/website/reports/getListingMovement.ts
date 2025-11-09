import axiosClient from "@/libs/axios/axios-client";
import type { GetListingMovementResponse, QueryParams } from "@/types/website/reports";

interface IGetListingMovement {
  property_id?: number;
  queryParams?: QueryParams & { month?: string; year?: string };
}

export default async function getListingMovement({ 
  property_id, 
  queryParams = {} 
}: IGetListingMovement) {
  const res = await axiosClient.get<GetListingMovementResponse>(
    `/report/property/${property_id}`, 
    {
      params: { ...queryParams },
    }
  );
  console.log(res.data)
  return res;
}
