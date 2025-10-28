import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateCounty from "@/api/admin/locations/updateCounty";
import type { UpdateCountyProps } from "@/api/admin/locations/updateCounty";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import type { CountyForm } from "@/data/admin/schema/LocationSchemas";

type HandleEditCountyProps = {
  county_id: number;
  payload: CountyForm;
};

function useUpdateCounty() {
  const queryClient = useQueryClient();

  const updateCountyMutation = useMutation({
    mutationFn: ({ id, data }: UpdateCountyProps) => updateCounty({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.counties],
      });
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.cities],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  async function handleEditCounty(submitData: HandleEditCountyProps) {
    const id = submitData.county_id;
    const data = {
      title: submitData.payload.title ?? "",
    };

    toast.promise(updateCountyMutation.mutateAsync({ id, data }), {
      loading: MESSAGES?.county?.edit?.loading,
      success: MESSAGES?.county?.edit?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { updateCountyMutation, handleEditCounty };
}

export default useUpdateCounty;
