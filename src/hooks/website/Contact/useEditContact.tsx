import updateContact from "@/api/website/contact/updateContact";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { ContactFormType } from "@/data/website/schema/ContactFormSchema";
import type { ContactFormData } from "@/types/website/contact";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useEditContact = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // navigate method
  const navigate = useNavigate();

  // handle edit contact
  const editContact = useMutation({
    mutationFn: updateContact,
    onSuccess: (data) => {
      // invalidate contact query
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.contact.query] })
        .catch(console.error);

      // navigate to contact page
      navigate("/contact");
    },
  });

  // handle submit edit contact form
  async function handleEditContact(
    submitData: ContactFormType,
    contactId: number
  ) {
    // Convert ContactFormType (with possible undefineds) to ContactFormData (with string | null, number | null)
    const data: ContactFormData = {
      name: submitData?.name ?? null,
      father_name: submitData?.father_name ?? null,
      surname: submitData?.surname ?? null,
      mother_name_and_surname: submitData?.mother_name_and_surname ?? null,
      place_of_birth: submitData?.place_of_birth ?? null,
      date_of_birth: submitData?.date_of_birth ?? null,
      registry: submitData?.registry ?? null,
      national_number: submitData?.national_number ?? null,
    };

    // toaster
    toast.promise(editContact.mutateAsync({ data, id: contactId }), {
      loading: MESSAGES?.contact?.edit?.loading,
      success: MESSAGES?.contact?.edit?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleEditContact,
    editContact,
  };
};
