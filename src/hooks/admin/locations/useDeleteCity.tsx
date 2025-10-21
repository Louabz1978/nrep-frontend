import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCity from "@/api/admin/locations/deleteCity";
import type { DeleteCityProps } from "@/api/admin/locations/deleteCity";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";

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

  return { deleteCityMutation };
}

export default useDeleteCity;
