import { useParams } from "react-router-dom";
import ContactForm from "./ContactForm";
import useGetContact from "@/hooks/website/Contact/useGetContact";
import StatusManager from "@/components/global/statusManager/StatusManager";
import { ContactFormSkeleton } from "./components/ContactFormSkeleton";
import { contactFormInitialValues } from "@/data/website/schema/ContactFormSchema";

const EditContactFormIndex = () => {
  // Get contact ID from URL params
  const { id } = useParams<{ id: string }>();
  const contactId = Number(id);

  // Get contact details
  const { contactDetails, contactDetailsQuery } = useGetContact(contactId);

  return (
    <StatusManager query={contactDetailsQuery} Loader={ContactFormSkeleton}>
      {!contactDetails ? null : (
        <ContactForm
          defaultValues={{
            name: contactDetails.name || contactFormInitialValues.name,
            father_name:
              contactDetails.father_name ||
              contactFormInitialValues.father_name,
            surname: contactDetails.surname || contactFormInitialValues.surname,
            mother_name_and_surname:
              contactDetails.mother_name_and_surname ||
              contactFormInitialValues.mother_name_and_surname,
            place_of_birth:
              contactDetails.place_of_birth ||
              contactFormInitialValues.place_of_birth,
            date_of_birth:
              contactDetails.date_of_birth ||
              contactFormInitialValues.date_of_birth,
            registry:
              contactDetails.registry || contactFormInitialValues.registry,
            national_number:
              contactDetails.national_number ||
              contactFormInitialValues.national_number,
          }}
          id={contactId}
        />
      )}
    </StatusManager>
  );
};

export default EditContactFormIndex;
