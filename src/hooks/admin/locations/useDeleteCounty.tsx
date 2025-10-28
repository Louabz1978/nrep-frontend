import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCounty from "@/api/admin/locations/deleteCounty";
import type { DeleteCountyProps } from "@/api/admin/locations/deleteCounty";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { showApiErrors } from "@/utils/showApiErrors";
import { toast } from "sonner"; // Import toast
import MESSAGES from "@/data/global/messages"; // Import messages

function useDeleteCounty() {
  const queryClient = useQueryClient();

  const deleteCountyMutation = useMutation({
    mutationFn: ({ id }: DeleteCountyProps) => deleteCounty({ id }),
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

  async function handleDeleteCounty({ id }: DeleteCountyProps) {
    // toaster
    toast.promise(deleteCountyMutation.mutateAsync({ id }), {
      loading: MESSAGES?.county?.delete?.loading,
      success: MESSAGES?.county?.delete?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return { deleteCountyMutation, handleDeleteCounty };
}

export default useDeleteCounty;
