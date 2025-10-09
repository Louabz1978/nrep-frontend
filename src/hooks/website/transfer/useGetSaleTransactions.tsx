import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getAllSalesTransactions from "@/api/website/transfer/getSaleTransfers";
import type { SaleTransaction, GetAllSalesTransactionsParams } from "@/api/website/transfer/getSaleTransfers";

function useGetSaleTransactions(params: GetAllSalesTransactionsParams = {}) {
  const saleTransactionsQuery = useQuery({
    queryKey: [QUERY_KEYS?.transfers?.sale, params],
    queryFn: () => getAllSalesTransactions(params),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const saleTransactions = saleTransactionsQuery?.data?.data as SaleTransaction[];
  const pagination = saleTransactionsQuery?.data?.pagination;

  return {
    query: saleTransactionsQuery,
    saleTransactions,
    pagination,
    isLoading: saleTransactionsQuery.isLoading,
    isError: saleTransactionsQuery.isError,
    error: saleTransactionsQuery.error,
    refetch: saleTransactionsQuery.refetch,
  };
}

export default useGetSaleTransactions;
