import { useMutation, useQueryClient } from "@tanstack/react-query";
import createAgency from "@/api/admin/agencies/createAgency";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { showApiErrors } from "@/utils/showApiErrors";
import type { CreateAgencyTypes } from "@/types/admin/agency";

function useCreateAgency() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createAgency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.agencies.query] }).catch(console.error);
      navigate("/admin/agencies");
    },
  });

  async function handleCreateAgency(submitData: CreateAgencyTypes) {
    const data: CreateAgencyTypes = { ...(submitData ?? {}) };
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.add.loading,
      success: MESSAGES.agency.add.success,
      error: (error) => showApiErrors(error),
    });
  }

  return { createAgency: mutation, handleCreateAgency };
}

export default useCreateAgency;


