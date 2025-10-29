import { useMutation, useQueryClient } from "@tanstack/react-query";
import addAgencyRealtor from "@/api/admin/agencies/addAgencyRealtor";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { showApiErrors } from "@/utils/showApiErrors";

function useAddAgencyRealtor() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addAgencyRealtor,
    onSuccess: (_data, variables) => {
      navigate("/admin/realtors");
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.realtors.query],
        })
        .catch(console.error);
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.agencies.details, variables.agency_id],
        })
        .catch(console.error);
    },
  });

  async function handleAddAgencyRealtor(
    data: Parameters<typeof addAgencyRealtor>[0]
  ) {
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.addRealtor.loading,
      success: MESSAGES.agency.addRealtor.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { addAgencyRealtor: mutation, handleAddAgencyRealtor };
}

export default useAddAgencyRealtor;
