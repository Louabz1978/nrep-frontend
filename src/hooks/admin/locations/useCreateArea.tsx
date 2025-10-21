import { useMutation, useQueryClient } from "@tanstack/react-query";
import createArea from "@/api/admin/locations/createArea";
import type { CreateAreaTypes } from "@/types/admin/location";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";

function useCreateArea() {
  const queryClient = useQueryClient();

  const createAreaMutation = useMutation({
    mutationFn: (data: CreateAreaTypes) => createArea(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.areas],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  return { createAreaMutation };
}

export default useCreateArea;
