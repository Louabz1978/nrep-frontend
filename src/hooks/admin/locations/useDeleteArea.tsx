import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteArea from "@/api/admin/locations/deleteArea";
import type { DeleteAreaProps } from "@/api/admin/locations/deleteArea";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";

function useDeleteArea() {
  const queryClient = useQueryClient();

  const deleteAreaMutation = useMutation({
    mutationFn: ({ id }: DeleteAreaProps) => deleteArea({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.areas],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  return { deleteAreaMutation };
}

export default useDeleteArea;
