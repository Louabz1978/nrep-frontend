import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCounty from "@/api/admin/locations/deleteCounty";
import type { DeleteCountyProps } from "@/api/admin/locations/deleteCounty";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";

function useDeleteCounty() {
  const queryClient = useQueryClient();

  const deleteCountyMutation = useMutation({
    mutationFn: ({ id }: DeleteCountyProps) => deleteCounty({ id }),
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

  return { deleteCountyMutation };
}

export default useDeleteCounty;
