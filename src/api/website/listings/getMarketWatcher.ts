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
export type GetMarketWatcherResult = MarketWatcherItem[] ;

async function getMarketWatcher({queryParams,}: GetMarketWatcherProps = {}): Promise<GetMarketWatcherResult> {
  const res = await axiosClient.get("/market_watcher", {
    params: {
      ...queryParams,
    },
  });

  return res?.data;
}

export default getMarketWatcher;


