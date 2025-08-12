import removeContact from "@/api/website/contact/removeContact";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const useDeleteContact = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // navigate method
  const navigate = useNavigate();

  // handle delete contact
  const deleteContact = useMutation({
    mutationFn: removeContact,
    onSuccess: () => {
      // invalidate contact query
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.contact.query] })
        .catch(console.error);
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.contact.myContact] })
        .catch(console.error);

      // navigate to contact page
      navigate("/contact");
    },
  });

  // handle submit delete contact form
  async function handleDeleteContact(
    id: number
    // forms:
  ) {
    // toaster
    toast.promise(deleteContact.mutateAsync({ id }), {
      loading: MESSAGES?.contact?.delete?.loading,
      success: MESSAGES?.contact?.delete?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleDeleteContact,
    deleteContact,
  };
};
