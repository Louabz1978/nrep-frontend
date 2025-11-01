import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { TopAgencyReport } from "@/types/admin/reports";
import type { QueryParams } from "@/types/website/reports";

export type GetTopAgenciesProps = {
  searchParams: QueryParams&{
    month?: string;
    year?: string;
  };
};

export type GetTopAgenciesResult = Promise<AxiosRes<TopAgencyReport[]>>;
async function getTopAgencies({ searchParams }: GetTopAgenciesProps): GetTopAgenciesResult {
  console.log("🔹 Fetching Top Agencies...", searchParams);

  const res = await axiosClient.get<AxiosRes<TopAgencyReport[]>>(
    `report/top_10_agencies_sales`,
    { params: { ...searchParams } }
  );

  console.log("✅ Response:", res.data);
  return res?.data;
}
export default getTopAgencies;
