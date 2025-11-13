import createNotification from "@/api/admin/notifications/createNotification";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { CreateNotificationData } from "@/api/admin/notifications/createNotification";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  const createNotificationMutation = useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.notifications.query] })
        .catch(console.error);
    },
  });

  async function handleCreateNotification(data: CreateNotificationData) {
    toast.promise(createNotificationMutation.mutateAsync(data), {
      loading: "جاري إرسال الإشعار...",
      success: "تم إرسال الإشعار بنجاح",
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleCreateNotification,
    createNotification: createNotificationMutation,
  };
};

