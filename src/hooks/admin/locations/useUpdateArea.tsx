import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateArea from "@/api/admin/locations/updateArea";
import type { UpdateAreaProps } from "@/api/admin/locations/updateArea";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";

function useUpdateArea() {
  const queryClient = useQueryClient();

  const updateAreaMutation = useMutation({
    mutationFn: ({ id, data }: UpdateAreaProps) => updateArea({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.areas],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  return { updateAreaMutation };
}

export default useUpdateArea;
