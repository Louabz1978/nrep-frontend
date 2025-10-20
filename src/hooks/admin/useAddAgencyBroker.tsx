import { useMutation, useQueryClient } from "@tanstack/react-query";
import addAgencyBroker from "@/api/admin/agencies/addagencyBroker";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";

function useAddAgencyBroker() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addAgencyBroker,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.agencies.details, variables.agency_id] }).catch(console.error);
    },
  });

  async function handleAddAgencyBroker(data: Parameters<typeof addAgencyBroker>[0]) {
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.addRealtor.loading,
      success: MESSAGES.agency.addRealtor.success,
      error: (e) => (e?.response?.data?.message ?? "حدث خطأ"),
    });
  }

  return { addAgencyBroker: mutation, handleAddAgencyBroker };
}

export default useAddAgencyBroker;


