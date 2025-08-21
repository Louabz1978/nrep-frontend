import updateContact from "@/api/website/contact/updateContact";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { ContactFormType } from "@/data/website/schema/ContactFormSchema";
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
    onSuccess: (res) => {
      // invalidate contact query
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.contact.query] })
        .catch(console.error);
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.contact.details, res?.id] })
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
    const data = {
      name: submitData?.name ?? "",
      father_name: submitData?.father_name ?? "",
      surname: submitData?.surname ?? "",
      mother_name_surname: submitData?.mother_name_surname ?? "",
      place_birth: submitData?.place_birth ?? "",
      date_birth: submitData?.date_birth ?? "",
      registry: submitData?.registry ?? "",
      national_number: submitData?.national_number ?? 0,
      email: submitData?.email ?? null,
      phone_number: submitData?.phone_number ?? null,
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
