import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";

// TODO: replace with your transfer type
export type SaleTransfer = {
  id: string;
  from: string;
  to: string;
  date: string;
};

export type GetSaleTransfersResult = Promise<
  AxiosRes<PaginationData<SaleTransfer[]>>
>;

async function getSaleTransfers(): GetSaleTransfersResult {
  const res = await axiosClient.get<
    AxiosRes<PaginationData<SaleTransfer[]>>
  >(`/transfers/sale`);

  return res?.data;
}

export default getSaleTransfers;
