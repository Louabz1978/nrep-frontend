import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getAllRentTransactions from "@/api/website/transfer/getRentalTransfers";
import type { RentTransaction, GetAllRentTransactionsParams } from "@/api/website/transfer/getRentalTransfers";

function useGetRentalTransactions(params: GetAllRentTransactionsParams = {}) {
  const rentalTransactionsQuery = useQuery({
    queryKey: [QUERY_KEYS?.transfers?.rental, params],
    queryFn: () => getAllRentTransactions(params),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const rentalTransactions = rentalTransactionsQuery?.data?.data as RentTransaction[];
  const pagination = rentalTransactionsQuery?.data?.pagination;

  return {
    query: rentalTransactionsQuery,
    rentalTransactions,
    pagination,
  };
}

export default useGetRentalTransactions;
