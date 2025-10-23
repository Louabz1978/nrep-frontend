import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateCounty from "@/api/admin/locations/updateCounty";
import type { UpdateCountyProps } from "@/api/admin/locations/updateCounty";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import MESSAGES from "@/data/global/messages";
import { toast } from "sonner";
import type { CountyForm } from "@/data/admin/schema/LocationSchemas";

// --- 1. Define the type for the data coming from the component ---
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

  // --- 2. Update the function to accept the new type ---
  async function handleEditCounty(submitData: HandleEditCountyProps) {
    // --- 3. Correctly extract the id and the data payload ---
    const id = submitData.county_id;
    const data = {
      title: submitData.payload.title ?? "",
    };

    // toaster
    // --- 4. Pass the correct { id, data } object to the mutation ---
    toast.promise(updateCountyMutation.mutateAsync({ id, data }), {
      loading: MESSAGES?.county?.add?.loading,
      success: MESSAGES?.county?.add?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { updateCountyMutation, handleEditCounty };
}

export default useUpdateCounty;
