import axiosClient from "@/libs/axios/axios-client";
import type { GetAgentMovementResponse,QueryParams } from "@/types/website/reports";

interface IGetAgentMovement {
  queryParams: QueryParams & { month?: string; year?: string };
}

export default async function getAgentMovement({ queryParams }: IGetAgentMovement) {
  const res = await axiosClient.get<GetAgentMovementResponse>(`/agent-movement`, {
    params: { ...queryParams },
  });
  return res;
}
