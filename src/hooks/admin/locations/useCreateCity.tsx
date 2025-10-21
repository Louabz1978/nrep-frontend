import { useMutation, useQueryClient } from "@tanstack/react-query";
import createCity from "@/api/admin/locations/createCity";
import type { CreateCityTypes } from "@/types/admin/location";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";

function useCreateCity() {
  const queryClient = useQueryClient();

  const createCityMutation = useMutation({
    mutationFn: (data: CreateCityTypes) => createCity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.cities],
      });
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.counties],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  return { createCityMutation };
}

export default useCreateCity;
