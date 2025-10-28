import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCity from "@/api/admin/locations/deleteCity";
import type { DeleteCityProps } from "@/api/admin/locations/deleteCity";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import { toast } from "sonner";
import MESSAGES from "@/data/global/messages";

function useDeleteCity() {
  const queryClient = useQueryClient();

  const deleteCityMutation = useMutation({
    mutationFn: ({ id }: DeleteCityProps) => deleteCity({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.cities],
      });
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.areas],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  // --- New handle function ---
  async function handleDeleteCity({ id }: DeleteCityProps) {
    // toaster
    toast.promise(deleteCityMutation.mutateAsync({ id }), {
      loading: MESSAGES?.city?.delete?.loading,
      success: MESSAGES?.city?.delete?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { handleDeleteCity , deleteCityMutation};
}

export default useDeleteCity;
