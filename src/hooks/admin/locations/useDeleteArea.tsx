import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteArea from "@/api/admin/locations/deleteArea";
import type { DeleteAreaProps } from "@/api/admin/locations/deleteArea";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import { toast } from "sonner";
import MESSAGES from "@/data/global/messages";

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
  async function handleDeleteArea({ id }: DeleteAreaProps) {
    // toaster
    toast.promise(deleteAreaMutation.mutateAsync({ id }), {
      loading: MESSAGES?.county?.delete?.loading,
      success: MESSAGES?.county?.delete?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { deleteAreaMutation, handleDeleteArea };
}

export default useDeleteArea;
