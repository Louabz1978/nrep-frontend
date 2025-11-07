import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export interface RemoveFromFavoritesProps {
  property_id: number;
}

export type RemoveFromFavoritesResult = Promise<AxiosRes<{ message: string }>>;

// remove property from favorites api call function
// gets: property_id
// returns: success message
async function removeFromFavorites({
  property_id,
}: RemoveFromFavoritesProps): RemoveFromFavoritesResult {
  const res = await axiosClient.delete<AxiosRes<{ message: string }>>(
    `/end-user/favorite-properties/${property_id}`
  );

  return res?.data;
}

export default removeFromFavorites;
