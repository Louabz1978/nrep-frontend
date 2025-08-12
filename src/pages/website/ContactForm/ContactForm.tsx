import { Button } from "@/components/global/form/button/Button";
import Input from "@/components/global/form/input/Input";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import type { ContactFormType } from "@/data/website/schema/ContactFormSchema";
import type { UseFormReturn } from "react-hook-form";
import { FaArrowCircleLeft } from "react-icons/fa";

interface ContactFormProps {
  form: UseFormReturn<ContactFormType>;
  handleSubmitContactForm: () => void;
  isEdit?: boolean;
}

const ContactForm = ({
  form,
  handleSubmitContactForm,
  isEdit = false,
}: ContactFormProps) => {
  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = () => {
    handleSubmitContactForm();
    console.log(form.getValues());
  };

  return (
    <AnimateContainer>
      <PageContainer>
        <FormSectionHeader>
          {isEdit ? "تعديل بيانات المشتري" : "إضافة مشتري جديد"}
        </FormSectionHeader>
        <form
          id="cotact_form"
          className="flex flex-col gap-6xl mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-8xl gap-y-4xl">
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
              name="mother_name_and_surname"
              info="يرجى إدخال اسم و نسبة الأم"
              required
            />
            <Input
              form={form}
              type="text"
              label="مكان الولادة"
              placeholder="أدخل مكان  الولادة"
              name="place_of_birth"
              info="يرجى إدخال مكان الولادة"
              required
            />
            <Input
              form={form}
              type="date"
              label="تاريخ الولادة"
              placeholder="أدخل تاريخ الولادة"
              name="date_of_birth"
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
              type="number"
              label="الرقم الوطني"
              placeholder="أدخل الرقم الوطني"
              name="national_number"
              info="يرجى إدخال الرقم الوطني"
              required
            />
          </div>
          <div className="flex justify-end w-full gap-xl">
            <Button id="contact_form" className="gap-5">
              {" "}
              تأكيد <FaArrowCircleLeft />
            </Button>
          </div>
        </form>
      </PageContainer>
    </AnimateContainer>
  );
};

export default ContactForm;
