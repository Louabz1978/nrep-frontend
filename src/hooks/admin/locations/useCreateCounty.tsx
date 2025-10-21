import { useMutation, useQueryClient } from "@tanstack/react-query";
import createCounty from "@/api/admin/locations/createCounty";
import type { CreateCountyTypes } from "@/types/admin/location";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";

function useCreateCounty() {
  const queryClient = useQueryClient();

  const createCountyMutation = useMutation({
    mutationFn: (data: CreateCountyTypes) => createCounty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.counties],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  return { createCountyMutation };
}

export default useCreateCounty;
