import type { PaginationData } from "../global/pagination";

export type ItemType = {
  id: number;
  name: string;
};

export type getItemsResType = Promise<
  {
    data: ItemType[];
  } & PaginationData
>;
