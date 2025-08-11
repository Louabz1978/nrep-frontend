import { contactFormInitialValues, ContactFormSchema } from "@/data/website/schema/ContactFormSchema";
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm} from "react-hook-form";
import ContactForm from "./ContactForm";



const ContactFormIndex = () => {

 // Contact form
  const Form = useForm({
    resolver: joiResolver(ContactFormSchema),
    defaultValues: cleanValues(
      contactFormInitialValues,
      contactFormInitialValues
    ),
    mode: "onChange",
  });

  return (
    <ContactForm form={Form}/>
  );
}

export default ContactFormIndex;
