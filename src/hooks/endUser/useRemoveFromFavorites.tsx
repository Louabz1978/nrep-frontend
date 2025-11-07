import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeFromFavorites from "@/api/endUser/removeFromFavorites";
import QUERY_KEYS from "@/data/global/queryKeys";
import { showApiErrors } from "@/utils/showApiErrors";
import { toast } from "sonner";
import MESSAGES from "@/data/global/messages";

export const useRemoveFromFavorites = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // handle remove from favorites
  const removeFromFavoritesMutation = useMutation({
    mutationFn: removeFromFavorites,
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

  // handle submit remove from favorites
  async function handleRemoveFromFavorites(property_id: number) {
    // toaster
    toast.promise(removeFromFavoritesMutation.mutateAsync({ property_id }), {
      loading: MESSAGES?.endUser?.favorites?.remove?.loading ?? "جاري الحذف...",
      success:
        MESSAGES?.endUser?.favorites?.remove?.success ?? "تم الحذف بنجاح",
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleRemoveFromFavorites,
    removeFromFavoritesMutation,
  };
};
