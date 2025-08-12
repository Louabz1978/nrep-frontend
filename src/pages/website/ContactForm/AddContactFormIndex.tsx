import {
  contactFormInitialValues,
  ContactFormSchema,
} from "@/data/website/schema/ContactFormSchema";
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import ContactForm from "./ContactForm";
import { useAddContact } from "@/hooks/website/Contact/useAddContact";

const AddContactFormIndex = () => {
  const { addContact, handleAddContact } = useAddContact();

  // Contact form
  const Form = useForm({
    resolver: joiResolver(ContactFormSchema),
    defaultValues: cleanValues(
      contactFormInitialValues,
      contactFormInitialValues
    ),
    mode: "onChange",
  });

  const handleSubmitContactForm = () => {
    handleAddContact({
      ...Form.watch(),
    });
  };

  return (
    <ContactForm
      handleSubmitContactForm={handleSubmitContactForm}
      form={Form}
      disabled={addContact?.isPending}
    />
  );
};

export default AddContactFormIndex;
