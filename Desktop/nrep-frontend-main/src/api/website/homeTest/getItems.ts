// import axiosClient from "@/libs/axios/axios-client";
import { type getItemsResType } from "@/types/website/homeTest";

// Helper function to delay execution
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// get items api call function
// returns: items data list
async function getItems(): getItemsResType {
  // const res = await axiosClient.get(`items`);

  await delay(3000);

  return {
    data: [
      { id: 1, name: "any name" },
      { id: 2, name: "any name2" },
    ],
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 2,
    to: 1,
    total: 2,
  };

  // return res?.data?.data;
}

export default getItems;
