import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { BrokerHistoryReport } from "@/types/admin/reports";

export type GetBrokerHistoryProps = {
  month?: string;
  year?: string;
  broker_id?: number;
};

export type GetBrokerHistoryResult = Promise<AxiosRes<BrokerHistoryReport[]>>;

async function getBrokerHistory({ 
  month = "9", 
  year = "2025",
  broker_id
}: GetBrokerHistoryProps = {}): GetBrokerHistoryResult {
  const res = await axiosClient.get<AxiosRes<BrokerHistoryReport[]>>(
    `/admin/reports/broker-history`,
    {
      params: {
        month,
        year,
        broker_id,
      },
    }
  );
  return res?.data;
}

export default getBrokerHistory;
