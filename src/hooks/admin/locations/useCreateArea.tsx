import { useMutation, useQueryClient } from "@tanstack/react-query";
import createArea from "@/api/admin/locations/createArea";
import type { CreateAreaTypes } from "@/types/admin/location";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import { toast } from "sonner";
import type { AreaForm } from "@/data/admin/schema/LocationSchemas";
import MESSAGES from "@/data/global/messages";

function useCreateArea() {
  const queryClient = useQueryClient();

  const createAreaMutation = useMutation({
    mutationFn: (data: CreateAreaTypes) => createArea(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.areas],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });
  async function handleAddArea(submitData: AreaForm) {
    const data = {
      title: submitData?.title ?? "",
      city_id : submitData?.city_id
    };

    // toaster
    toast.promise(createAreaMutation.mutateAsync(data), {
      loading: MESSAGES?.area?.add?.loading,
      success: MESSAGES?.area?.add?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }
  return { handleAddArea, createAreaMutation };
}

export default useCreateArea;
