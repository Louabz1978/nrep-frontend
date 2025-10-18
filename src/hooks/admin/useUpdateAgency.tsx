import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateAgency from "@/api/admin/agencies/updateAgency";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";

function useUpdateAgency() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAgency,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.agencies.query] }).catch(console.error);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.agencies.details, variables.agency_id] }).catch(console.error);
    },
  });

  async function handleUpdateAgency(data: Parameters<typeof updateAgency>[0]) {
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.edit.loading,
      success: MESSAGES.agency.edit.success,
      error: (e) => (e?.response?.data?.message ?? "حدث خطأ"),
    });
  }

  return { updateAgency: mutation, handleUpdateAgency };
}

export default useUpdateAgency;


