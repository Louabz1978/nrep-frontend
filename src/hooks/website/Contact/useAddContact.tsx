import createContact from "@/api/website/contact/creatContact";
import MESSAGES from "@/data/global/messages";
import QUERY_KEYS from "@/data/global/queryKeys";
import type { ContactFormType } from "@/data/website/schema/ContactFormSchema";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAddContact = () => {
  // query client to manage invalidating
  const queryClient = useQueryClient();

  // navigate method
  const navigate = useNavigate();

  // handle add contact
  const addContact = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      // invalidate contact query
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.contact.query] })
        .catch(console.error);

      // navigate to contact page
      navigate("/contact");
    },
  });

  // handle submit add contact form
  async function handleAddContact(submitData: ContactFormType) {
    // Convert ContactFormType (with possible undefineds) to ContactFormData (with string | null, number | null)
    const data = {
      name: submitData?.name ?? null,
      father_name: submitData?.father_name ?? null,
      surname: submitData?.surname ?? null,
      mother_name_surname: submitData?.mother_name_surname ?? null,
      place_birth: submitData?.place_birth ?? null,
      date_birth: submitData?.date_birth ?? null,
      registry: submitData?.registry ?? null,
      national_number: submitData?.national_number ?? null,
      email: submitData?.email ?? null,
      phone_number: submitData?.phone_number ?? null,
    };

    // toaster
    toast.promise(addContact.mutateAsync({ data }), {
      loading: MESSAGES?.contact?.add?.loading,
      success: MESSAGES?.contact?.add?.success,
      error: (error) => {
        return showApiErrors(error);
      },
    });
  }

  return {
    handleAddContact,
    addContact,
  };
};
