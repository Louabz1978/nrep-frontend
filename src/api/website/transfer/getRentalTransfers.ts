import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";

// TODO: replace with your transfer type
export type RentalTransfer = {
  id: string;
  from: string;
  to: string;
  date: string;
};

export type GetRentalTransfersResult = Promise<
  AxiosRes<PaginationData<RentalTransfer[]>>
>;

async function getRentalTransfers(): GetRentalTransfersResult {
  const res = await axiosClient.get<
    AxiosRes<PaginationData<RentalTransfer[]>>
  >(`/transfers/rental`);

  return res?.data;
}

export default getRentalTransfers;
