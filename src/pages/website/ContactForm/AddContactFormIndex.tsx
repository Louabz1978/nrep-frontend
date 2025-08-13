
import { contactFormInitialValues } from "@/data/website/schema/ContactFormSchema";
import ContactForm from "./ContactForm";
import { useAddContact } from "@/hooks/website/Contact/useAddContact";

const AddContactFormIndex = () => {
  const { addContact } = useAddContact();

  return (
    <ContactForm
      defaultValues={contactFormInitialValues}
      disabled={addContact?.isPending}
    />
  );
};

export default AddContactFormIndex;
