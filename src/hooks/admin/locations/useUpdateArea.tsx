import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateArea from "@/api/admin/locations/updateArea";
import type { UpdateAreaProps } from "@/api/admin/locations/updateArea";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import type { AreaForm } from "@/data/admin/schema/LocationSchemas";

type HandleEditAreaProps = {
  area_id: number;
  payload: AreaForm;
};

function useUpdateArea() {
  const queryClient = useQueryClient();

  const updateAreaMutation = useMutation({
    mutationFn: ({ id, data }: UpdateAreaProps) => updateArea({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.areas],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  async function handleEditArea(submitData: HandleEditAreaProps) {
    const id = submitData.area_id;
    console.log({ submitData });
    const data = {
      title: submitData.payload.title ?? "",
      city_id: submitData.payload.city_id,
    };
    console.log({ data });

    toast.promise(updateAreaMutation.mutateAsync({ id, data }), {
      loading: MESSAGES?.area?.edit?.loading,
      success: MESSAGES?.area?.edit?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { updateAreaMutation, handleEditArea };
}

export default useUpdateArea;
