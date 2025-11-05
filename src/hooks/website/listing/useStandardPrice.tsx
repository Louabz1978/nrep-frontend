import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getStandardPrice from "@/api/website/listings/getStandardPrice";

interface GetStandardPriceProps {
  property_id: number;
  target_year: number;
}
interface GetStandardPriceResult {
  property_id: number;
  predicted_price: number | null;
}

function useStandardPrice(params: GetStandardPriceProps | null) {
  const expectedPrice = useQuery<GetStandardPriceResult>({
    queryKey: [QUERY_KEYS.reports?.expected_price, params],
    queryFn: () => getStandardPrice(params!),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    standardPrice: expectedPrice.data,
  };
}

export default useStandardPrice;
