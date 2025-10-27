import axiosClient from "@/libs/axios/axios-client";

export type GetMarketWatcherProps = {
  queryParams?: Record<string, string>;
};
export type MarketWatcherItem = {
  label: string;
  value: number;
  date?: string;
  area?: string;
};
export type GetMarketWatcherResult = MarketWatcherItem[];

async function getMarketWatcher({
  queryParams,
}: GetMarketWatcherProps = {}): Promise<GetMarketWatcherResult> {
  const res = await axiosClient.get("/report/market_watcher", {
    params: {
      ...queryParams,
    },
  });

  const response = {
    closed_count: 0,
    new_listings_count: 0,
    out_of_market: 0,
    pending_count: 0,
    return_the_market: 0,
  };
  await Promise.all(
    Object.keys(res?.data ?? {})?.map((ele) => {
      Object.keys(res?.data?.[ele] ?? {})?.map((i) => {
        response[i] = response[i] + res?.data?.[ele][i];
      });
    }) ?? []
  );
  console.log({ response });
  return response;
}

export default getMarketWatcher;
