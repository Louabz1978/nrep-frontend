import { useMutation, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import deleteBroker from "@/api/admin/agencies/deleteBroker";
import { showApiErrors } from "@/utils/showApiErrors";

function useDeleteBroker() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBroker,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.brokers.query] })
        .catch(console.error);
    },
  });

  async function handleDeleteBroker(data: Parameters<typeof deleteBroker>[0]) {
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.deleteBroker.loading,
      success: MESSAGES.agency.deleteBroker.success,
      error: (error) => showApiErrors(error),
    });
  }

  return { deleteBroker: mutation, handleDeleteBroker };
}

export default useDeleteBroker;
