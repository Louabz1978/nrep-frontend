import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  contactFormInitialValues,
  ContactFormSchema,
} from "@/data/website/schema/ContactFormSchema";
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import ContactForm from "./ContactForm";
import { useEditContact } from "@/hooks/website/Contact/useEditContact";
import useGetContact from "@/hooks/website/Contact/useGetContact";
import StatusManager from "@/components/global/statusManager/StatusManager";
import { ContactFormSkeleton } from "./components/ContactFormSkeleton";

const EditContactFormIndex = () => {
  // Get contact ID from URL params
  const { id } = useParams<{ id: string }>();
  const contactId = Number(id);

  // Get contact details
  const { contactDetails, contactDetailsQuery } = useGetContact(contactId);

  // Edit contact hook
  const { handleEditContact } = useEditContact();

  // Contact form
  const Form = useForm({
    resolver: joiResolver(ContactFormSchema),
    defaultValues: cleanValues(
      contactFormInitialValues,
      contactFormInitialValues
    ),
    mode: "onChange",
  });

  // Update form values when contact details are loaded
  useEffect(() => {
    if (contactDetails) {
      Form.reset({
        name: contactDetails.name || "",
        father_name: contactDetails.father_name || "",
        surname: contactDetails.surname || "",
        mother_name_and_surname: contactDetails.mother_name_and_surname || "",
        place_of_birth: contactDetails.place_of_birth || "",
        date_of_birth: contactDetails.date_of_birth || "",
        registry: contactDetails.registry || "",
        national_number: contactDetails.national_number || null,
      });
    }
  }, [contactDetails, Form]);

  const handleSubmitContactForm = () => {
    handleEditContact(Form.watch(), contactId);
  };

  return (
    <StatusManager query={contactDetailsQuery} Loader={ContactFormSkeleton}>
      {!contactDetails ? null : (
        <ContactForm
          handleSubmitContactForm={handleSubmitContactForm}
          form={Form}
          isEdit={true}
        />
      )}
    </StatusManager>
  );
};

export default EditContactFormIndex;
