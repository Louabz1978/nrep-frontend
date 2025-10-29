import { useMutation, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import deleteRealtor from "@/api/admin/agencies/deleteRealtor";
import { showApiErrors } from "@/utils/showApiErrors";

function useDeleteRealtor() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteRealtor,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.realtors.query] })
        .catch(console.error);
    },
  });

  async function handleDeleteRealtor(
    data: Parameters<typeof deleteRealtor>[0]
  ) {
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.deleteRealtor.loading,
      success: MESSAGES.agency.deleteRealtor.success,
      error: (error) => showApiErrors(error),
    });
  }

  return { deleteRealtor: mutation, handleDeleteRealtor };
}

export default useDeleteRealtor;
