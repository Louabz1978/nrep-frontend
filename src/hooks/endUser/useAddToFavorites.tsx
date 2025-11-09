import { useMutation, useQueryClient } from "@tanstack/react-query";
import addToFavorites from "@/api/endUser/addToFavorites";
import QUERY_KEYS from "@/data/global/queryKeys";
import { showApiErrors } from "@/utils/showApiErrors";
import { toast } from "sonner";
import MESSAGES from "@/data/global/messages";

export const useAddToFavorites = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // handle add to favorites
  const addToFavoritesMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      // invalidate favorite properties query
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.endUser?.favoriteProperties],
        })
        .catch(console.error);
      // invalidate shared properties query in case the property is in shared list
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.endUser?.sharedProperties],
        })
        .catch(console.error);
    },
  });

  // handle submit add to favorites
  async function handleAddToFavorites(property_id: number) {
    // toaster
    toast.promise(addToFavoritesMutation.mutateAsync({ property_id }), {
      loading: MESSAGES?.endUser?.favorites?.add?.loading,
      success: MESSAGES?.endUser?.favorites?.add?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleAddToFavorites,
    addToFavoritesMutation,
  };
};
