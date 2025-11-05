import axiosClient from "@/libs/axios/axios-client";

export interface GetStandardPriceProps {
  property_id: number;
  target_year: number;
}

export interface GetStandardPriceResult {
  property_id: number;
  predicted_price: number | null;
}

async function getStandardPrice({ property_id, target_year }: GetStandardPriceProps): Promise<GetStandardPriceResult> {
  const res = await axiosClient.get(`/report/standard_price`, {
    params: {
      property_id,
      target_year,
    },
  });
  return res.data;
}

export default getStandardPrice;
