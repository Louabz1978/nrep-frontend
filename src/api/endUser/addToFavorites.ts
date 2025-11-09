import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export interface AddToFavoritesProps {
  property_id: number;
}

export type AddToFavoritesResult = Promise<AxiosRes<{ message: string }>>;

// add property to favorites api call function
// gets: property_id
// returns: success message
async function addToFavorites({
  property_id,
}: AddToFavoritesProps): AddToFavoritesResult {
  const res = await axiosClient.post<AxiosRes<{ message: string }>>(
    `/end-user/favorite-properties`,
    { property_id }
  );

  return res?.data;
}

export default addToFavorites;
