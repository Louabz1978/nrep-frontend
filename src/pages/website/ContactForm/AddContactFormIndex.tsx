import { contactFormInitialValues } from "@/data/website/schema/ContactFormSchema";
import ContactForm from "./ContactForm";

const AddContactFormIndex = () => {
  return <ContactForm defaultValues={contactFormInitialValues} />;
};

export default AddContactFormIndex;
