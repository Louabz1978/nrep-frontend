import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateCity from "@/api/admin/locations/updateCity";
import type { UpdateCityProps } from "@/api/admin/locations/updateCity";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";

function useUpdateCity() {
  const queryClient = useQueryClient();

  const updateCityMutation = useMutation({
    mutationFn: ({ id, data }: UpdateCityProps) => updateCity({ id, data }),
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

  return { updateCityMutation };
}

export default useUpdateCity;
