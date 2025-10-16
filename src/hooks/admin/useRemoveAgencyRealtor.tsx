import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeAgencyRealtor from "@/api/admin/agencies/removeAgencyRealtor";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";

function useRemoveAgencyRealtor() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: removeAgencyRealtor,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.agencies.details, variables.agency_id] }).catch(console.error);
    },
  });

  async function handleRemoveAgencyRealtor(data: Parameters<typeof removeAgencyRealtor>[0]) {
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.removeRealtor.loading,
      success: MESSAGES.agency.removeRealtor.success,
      error: (e) => (e?.response?.data?.message ?? "حدث خطأ"),
    });
  }

  return { removeAgencyRealtor: mutation, handleRemoveAgencyRealtor };
}

export default useRemoveAgencyRealtor;


