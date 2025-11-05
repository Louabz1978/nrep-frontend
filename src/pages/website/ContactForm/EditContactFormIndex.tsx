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
            mother_name_surname:
              contactDetails.mother_name_surname ||
              contactFormInitialValues.mother_name_surname,
            place_birth:
              contactDetails.place_birth ||
              contactFormInitialValues.place_birth,
            date_birth: contactDetails.date_birth
              ? contactDetails?.date_birth?.split("T")?.[0]
              : contactFormInitialValues.date_birth,
            registry:
              contactDetails.registry || contactFormInitialValues.registry,
            national_number:
              contactDetails.national_number ||
              contactFormInitialValues.national_number,
            phone_number:
              contactDetails.phone_number ||
              contactFormInitialValues.phone_number,
            email: contactDetails.email || contactFormInitialValues.email,
            password: "Aa!11111",
          }}
          id={contactId}
        />
      )}
    </StatusManager>
  );
};

export default EditContactFormIndex;
