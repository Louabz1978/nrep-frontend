import axiosClient from "@/libs/axios/axios-client";
import type { GetTopAgentResponse, QueryParams } from "@/types/website/reports";

interface IGetTopAgent {
  queryParams: QueryParams;
}

export default async function getTopAgent({ queryParams }: IGetTopAgent) {
  const res = await axiosClient.get<GetTopAgentResponse>(
    `reports/top-agent`,
    {
      params: { ...queryParams },
    }
  );
  return res.data;
}
