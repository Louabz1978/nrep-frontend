import { useMutation, useQueryClient } from "@tanstack/react-query";
import createCity from "@/api/admin/locations/createCity";
import type { CreateCityTypes } from "@/types/admin/location";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import type { CityForm } from "@/data/admin/schema/LocationSchemas";
import { toast } from "sonner";
import MESSAGES from "@/data/global/messages";

function useCreateCity() {
  const queryClient = useQueryClient();

  const createCityMutation = useMutation({
    mutationFn: (data: CreateCityTypes) => createCity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.cities],
      });
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.counties],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });
  // handle submit add contact form
  async function handleAddCity(submitData: CityForm) {
    const data = {
      title: submitData?.title ?? "",
      county_id: submitData?.county_id,
    };

    // toaster
    toast.promise(createCityMutation.mutateAsync(data), {
      loading: MESSAGES?.city?.add?.loading,
      success: MESSAGES?.city?.add?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { handleAddCity , createCityMutation};
}

export default useCreateCity;
