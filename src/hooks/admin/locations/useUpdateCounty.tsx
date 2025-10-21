import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateCounty from "@/api/admin/locations/updateCounty";
import type { UpdateCountyProps } from "@/api/admin/locations/updateCounty";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";

function useUpdateCounty() {
  const queryClient = useQueryClient();

  const updateCountyMutation = useMutation({
    mutationFn: ({ id, data }: UpdateCountyProps) => updateCounty({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.counties],
      });
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.cities],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  return { updateCountyMutation };
}

export default useUpdateCounty;
