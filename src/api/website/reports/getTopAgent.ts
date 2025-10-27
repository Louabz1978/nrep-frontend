import axiosClient from "@/libs/axios/axios-client";
import type { GetTopAgentResponse, QueryParams } from "@/types/website/reports";

interface IGetTopAgent {
  queryParams: QueryParams & { month?: string; year?: string };
}

export default async function getTopAgent({ queryParams }: IGetTopAgent) {
  const res = await axiosClient.get<GetTopAgentResponse>(
    `/report/top_10_agent`,
    {
      params: { ...queryParams },
    }
  );
  return res;
}
