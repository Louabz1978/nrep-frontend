import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import {
  contactFormInitialValues,
  ContactFormSchema,
  type ContactFormType,
} from "@/data/website/schema/ContactFormSchema";
import { useAddContact } from "@/hooks/website/Contact/useAddContact";
import { useEditContact } from "@/hooks/website/Contact/useEditContact";
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { PiPaperPlaneRightFill } from "react-icons/pi";

interface ContactFormProps {
  defaultValues: ContactFormType;
  id?: number;
  changed?: string;
}

const ContactForm = ({ defaultValues, id }: ContactFormProps) => {
  // Add contact hook
  const { handleAddContact, addContact } = useAddContact();
  // Edit contact hook
  const { handleEditContact, editContact } = useEditContact();

  // initial values
  const initialValues = cleanValues(contactFormInitialValues, defaultValues);
  // Contact form
  const form = useForm({
    resolver: joiResolver(ContactFormSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const handleSubmitContactForm = () => {
    if (id)
      handleEditContact(
        {
          ...form.watch(),
        },
        id
      ).catch(console.error);
    else {
      handleAddContact({
        ...form.watch(),
      });
    }
  };

  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = () => {
    handleSubmitContactForm();
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <FormSectionHeader>
          {id ? "تعديل بيانات جهة الاتصال" : "إضافة جهة اتصال"}
        </FormSectionHeader>
        <form
          id="cotact_form"
          className="flex flex-col gap-6xl mt-10 flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" grid xl:grid-cols-3 md:grid-cols-2 gap-x-8xl gap-y-4xl">
            <Input
              form={form}
              type="text"
              label="الاسم"
              placeholder="أدخل الاسم"
              name="name"
              info="يرجى إدخال الاسم "
              required
            />
            <Input
              form={form}
              type="text"
              label="اسم الأب"
              placeholder="أدخل اسم الأب"
              name="father_name"
              info="يرجى إدخال اسم الأب"
              required
            />
            <Input
              form={form}
              type="text"
              label="النسبة"
              placeholder="أدخل النسبة"
              name="surname"
              info="يرجى إدخال النسبة"
              required
            />
            <Input
              form={form}
              type="text"
              label="اسم و نسبة الأم"
              placeholder="أدخل اسم و نسبة الأم"
              name="mother_name_surname"
              info="يرجى إدخال اسم و نسبة الأم"
              required
            />
            <Input
              form={form}
              type="text"
              label="مكان الولادة"
              placeholder="أدخل مكان  الولادة"
              name="place_birth"
              info="يرجى إدخال مكان الولادة"
              required
            />
            <Input
              form={form}
              type="date"
              label="تاريخ الولادة"
              placeholder="أدخل تاريخ الولادة"
              name="date_birth"
              info="يرجى إدخال تاريخ الولادة"
              required
            />
            <Input
              form={form}
              type="text"
              label="القيد"
              placeholder="أدخل القيد"
              name="registry"
              info="يرجى إدخال القيد"
              required
            />
            <Input
              form={form}
              label="الرقم الوطني"
              placeholder="أدخل الرقم الوطني"
              name="national_number"
              info="يرجى إدخال الرقم الوطني"
              required
            />
            <Input
              form={form}
              type="email"
              label="البريد الإلكتروني"
              placeholder="أدخل البريد الإلكتروني"
              name="email"
              info="يرجى إدخال البريد الإلكتروني"
              required
            />
            <Input
              form={form}
              type="string"
              label="رقم الهاتف"
              placeholder="أدخل رقم الهاتف"
              name="phone_number"
              info="يرجى إدخال رقم الهاتف"
              required
            />
            {id ? null : (
              <Input
                form={form}
                type="string"
                label="كلمة المرور"
                placeholder="أدخل كلمة االمرور"
                name="password"
                info="يرجى إدخال كلمة المرور"
                required
              />
            )}
          </div>
          <div className="flex justify-end w-full gap-xl mt-auto">
            <Button
              id="contact_form"
              disabled={id ? editContact?.isPending : addContact?.isPending}
              className="gap-lg"
            >
              إرسال <PiPaperPlaneRightFill className={"rotate-180"} />
            </Button>
          </div>
        </form>
      </PageContainer>
    </AnimateContainer>
  );
};

export default ContactForm;
