import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getSaleTransfers from "@/api/website/contracts/getSaleTransfers";
import type { SaleTransfer } from "@/api/website/contracts/getSaleTransfers";

function useGetSaleTransfers() {
  const saleTransfersQuery = useQuery({
    queryKey: [QUERY_KEYS?.transfers?.sale],
    queryFn: () => getSaleTransfers(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const saleTransfers = saleTransfersQuery?.data?.data as SaleTransfer[];

  return {
    saleTransfers,
  };
}
export default useGetSaleTransfers;

