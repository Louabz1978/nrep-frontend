import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getRentalTransfers from "@/api/website/contracts/getRentalTransfers";
import type { RentalTransfer } from "@/api/website/contracts/getRentalTransfers";

function useGetRentalTransfers() {
  const rentalTransfersQuery = useQuery({
    queryKey: [QUERY_KEYS?.transfers?.rental],
    queryFn: () => getRentalTransfers(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const rentalTransfers = rentalTransfersQuery?.data?.data as RentalTransfer[];


  return {
    
    rentalTransfers,
  };
}
export default useGetRentalTransfers;

