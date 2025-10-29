// src/hooks/admin/useEditAgency.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { showApiErrors } from "@/utils/showApiErrors";
import type { CreateAgencyTypes } from "@/types/admin/agency";
import editAgency from "@/api/admin/agencies/editAgency";

function useEditAgency() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: editAgency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.agencies.query] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.agencies.details],
      });
      navigate("/admin/agencies");
    },
  });

  async function handleEditAgency(submitData: CreateAgencyTypes, id: string) {
    const data: CreateAgencyTypes = {
      ...(submitData ?? {}),
      city_id: submitData?.city_id?.city_id,
      area_id: submitData?.area_id?.area_id,
      county_id: submitData?.county_id?.county_id,
      id,
    };
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.edit.loading,
      success: MESSAGES.agency.edit.success,
      error: (error) => showApiErrors(error),
    });
  }

  return { editAgency: mutation, handleEditAgency };
}

export default useEditAgency;
