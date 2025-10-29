import { useMutation, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { showApiErrors } from "@/utils/showApiErrors";
import editAgencyBroker from "@/api/admin/agencies/editagencyBroker";

function useEditAgencyBroker() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: editAgencyBroker,
    onSuccess: (_data, variables) => {
      navigate("/admin/brokers");
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.brokers.query],
        })
        .catch(console.error);
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.brokers.details],
        })
        .catch(console.error);
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.agencies.details, variables.agency_id],
        })
        .catch(console.error);
    },
  });

  async function handlEditAgencyBroker(
    data: Parameters<typeof editAgencyBroker>[0]
  ) {
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.editBroker.loading,
      success: MESSAGES.agency.editBroker.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { editAgencyBroker: mutation, handlEditAgencyBroker };
}

export default useEditAgencyBroker;
