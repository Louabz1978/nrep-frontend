import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateCity from "@/api/admin/locations/updateCity";
import type { UpdateCityProps } from "@/api/admin/locations/updateCity";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import type { CityForm } from "@/data/admin/schema/LocationSchemas";
import { toast } from "sonner";
import MESSAGES from "@/data/global/messages";

// --- 1. Define the type for the data coming from the component ---
type HandleEditCityProps = {
  city_id: number;
  payload: CityForm;
};

function useUpdateCity() {
  const queryClient = useQueryClient();

  const updateCityMutation = useMutation({
    mutationFn: ({ id, data }: UpdateCityProps) => updateCity({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.cities],
      });
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.areas],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });

  async function handleEditCity(submitData:HandleEditCityProps ) {
    const id = submitData.city_id;
    const data = {
      title: submitData.payload.title ?? "",
      county_id: submitData.payload.county_id,
    };

    toast.promise(updateCityMutation.mutateAsync({ id, data }), {
      loading: MESSAGES?.city?.edit?.loading,
      success: MESSAGES?.city?.edit?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { handleEditCity , updateCityMutation};
}

export default useUpdateCity;
