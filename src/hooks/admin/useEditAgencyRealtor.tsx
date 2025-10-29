import { useMutation, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { showApiErrors } from "@/utils/showApiErrors";
import editAgencyRealtor from "@/api/admin/agencies/editagencyRealtor";

function useEditAgencyRealtor() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: editAgencyRealtor,
    onSuccess: (_data) => {
      navigate("/admin/realtors");
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.realtors.query],
        })
        .catch(console.error);
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.realtors.details],
        })
        .catch(console.error);
    },
  });

  async function handlEditAgencyRealtor(
    data: Parameters<typeof editAgencyRealtor>[0]
  ) {
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.editRealtor.loading,
      success: MESSAGES.agency.editRealtor.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { editAgencyRealtor: mutation, handlEditAgencyRealtor };
}

export default useEditAgencyRealtor;
