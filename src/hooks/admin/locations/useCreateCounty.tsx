import { useMutation, useQueryClient } from "@tanstack/react-query";
import createCounty from "@/api/admin/locations/createCounty";
import type { CreateCountyTypes } from "@/types/admin/location";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import { toast } from "sonner";
import MESSAGES from "@/data/global/messages";
import type { CountyForm } from "@/data/admin/schema/LocationSchemas";

function useCreateCounty() {
  const queryClient = useQueryClient();

  const createCountyMutation = useMutation({
    mutationFn: (data: CreateCountyTypes) => createCounty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TABLE_PREFIXES.counties],
      });
    },
    onError: (error) => {
      showApiErrors(error);
    },
  });
  // handle submit add contact form
  async function handleAddCounty(submitData: CountyForm) {
    const data = {
      title: submitData?.title ?? "",
    };

    // toaster
    toast.promise(createCountyMutation.mutateAsync(data), {
      loading: MESSAGES?.county?.add?.loading,
      success: MESSAGES?.county?.add?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }
  return { handleAddCounty, createCountyMutation };
}

export default useCreateCounty;
