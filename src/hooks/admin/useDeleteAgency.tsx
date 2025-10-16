import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteAgency from "@/api/admin/agencies/deleteAgency";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";

function useDeleteAgency() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAgency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.agencies.query] }).catch(console.error);
    },
  });

  async function handleDeleteAgency(data: Parameters<typeof deleteAgency>[0]) {
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.delete.loading,
      success: MESSAGES.agency.delete.success,
      error: (e) => (e?.response?.data?.message ?? "حدث خطأ"),
    });
  }

  return { deleteAgency: mutation, handleDeleteAgency };
}

export default useDeleteAgency;


