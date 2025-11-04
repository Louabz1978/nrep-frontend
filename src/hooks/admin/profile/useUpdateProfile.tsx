import updateProfile from "@/api/admin/profile/updateProfile";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import type {
  UpdateProfileFormData,
} from "@/types/admin/profile";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.profile.query] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.profile.details],
      });
    },
  });

  async function handleUpdateProfile(submitData: UpdateProfileFormData) {
    const data: UpdateProfileFormData = {
      ...(submitData ?? {}),
    };
    await toast.promise(mutation.mutateAsync(data), {
      loading: MESSAGES.agency.edit.loading,
      success: MESSAGES.agency.edit.success,
      error: (error) => showApiErrors(error),
    });
  }

  return { upadateProfile: mutation, handleUpdateProfile };
};

export default useUpdateProfile;
