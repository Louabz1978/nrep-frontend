import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { type Dispatch, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import { type GeneralStepType } from "@/data/website/schema/ListingFormSchema";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import {
  cityChoices,
  PROPERTY_TYPE,
  STATUS,
  TransType,
} from "@/data/global/select";
import Textarea from "@/components/global/form/textarea/Textarea";
import useGetAllContacts from "@/hooks/website/Contact/useGetAllContacts";

interface GeneralStepProps {
  form: UseFormReturn<GeneralStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// general step component
function GeneralStep({ form, setCurrentStep }: GeneralStepProps) {
  // extract form utils
  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = () => {
    setCurrentStep((prev) => prev + 1);
    console.log(form.watch());
  };

  const { allContacts } = useGetAllContacts();

  return (
    <AnimateContainer>
      <form
        id="general_step_form"
        className="flex flex-col gap-6xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-5xl gap-y-3xl">
          <FormSectionHeader>المعلومات العامة</FormSectionHeader>
          <Input
            form={form}
            label="رقم البناء"
            placeholder="أدخل رقم البناء"
            name="building_num"
            info="يرجى إدخال رقم البناء كما هو موضح في العنوان الرسمي"
            required
          />
          <Input
            form={form}
            type="text"
            label="اسم الشارع"
            placeholder="أدخل اسم الشارع"
            name="street"
            info="يرجى إدخال اسم الشارع الذي يقع فيه العقار"
            required
          />
          <Input
            form={form}
            type="number"
            label="الطابق"
            numberRegex={/^\d*$/}
            placeholder="أدخل رقم الطابق"
            name="floor"
            info="يرجى إدخال رقم الطابق الذي يقع فيه العقار"
            required
          />
          <Input
            form={form}
            type="number"
            numberRegex={/^\d*$/}
            label="رقم الشقة"
            placeholder="أدخل رقم الشقة"
            name="apt"
            info="يرجى إدخال رقم الشقة إذا كان العقار شقة"
            required
          />
          <Select
            form={form}
            label="المحافظة"
            placeholder="اختر المحافظة"
            choices={cityChoices}
            keyValue="value"
            showValue="label"
            name="country"
            info="يرجى اختيار المحافظة التي يقع فيها العقار"
            required
          />
          <Select
            form={form}
            label="المدينة"
            placeholder="اختر المدينة"
            choices={cityChoices}
            keyValue="value"
            showValue="label"
            name="city"
            info="يرجى اختيار المدينة التي يقع فيها العقار"
            required
          />
          <Input
            form={form}
            label="الحي/المنطقة"
            placeholder="اختر الحي أو المنطقة"
            name="area"
            info="يرجى اختيار الحي أو المنطقة التي يقع فيها العقار"
            required
          />
          <Select
            form={form}
            label="نوع العقار"
            placeholder="اختر نوع العقار"
            choices={PROPERTY_TYPE}
            keyValue="value"
            showValue="label"
            name="property_type"
            info="يرجى اختيار نوع العقار (شقة، فيلا، أرض، ...)"
            required
          />
          <Input
            form={form}
            type="number"
            label="مساحة العقار (م²)"
            placeholder="أدخل مساحة العقار"
            name="area_space"
            info="يرجى إدخال المساحة الكلية للعقار بالمتر المربع"
            required
          />
          <Input
            form={form}
            type="number"
            numberRegex={/^\d*$/}
            label="عدد غرف النوم"
            placeholder="أدخل عدد غرف النوم"
            name="bedrooms"
            info="يرجى إدخال عدد غرف النوم في العقار"
            required
          />
          <Input
            form={form}
            type="number"
            label="عدد الحمامات"
            placeholder="أدخل عدد الحمامات"
            name="bathrooms"
            info="يرجى إدخال عدد الحمامات في العقار"
            required
          />
          <Input
            form={form}
            type="number"
            label="السعر ($)"
            placeholder="أدخل سعر العقار بالدولار"
            name="price"
            info="يرجى إدخال سعر العقار بالدولار الأمريكي"
            required
          />
          <Select
            form={form}
            label="البائعون"
            placeholder="اختر البائعون"
            choices={allContacts ?? []}
            keyValue="consumer_id"
            showValue="name"
            multiple={true}
            name="sellers"
            info="يرجى اختيار البائعون"
            required
          />
          <Input
            form={form}
            type="number"
            label="عمولة وكيل البائع (%)"
            placeholder="أدخل عمولة وكيل البائع"
            name="property_realtor_commission"
            info="يرجى إدخال قيمة عمولة وكيل البائع بالدولار"
            required
          />
          <Input
            form={form}
            type="number"
            label="عمولة وكيل المشتري (%)"
            placeholder="أدخل عمولة وكيل المشتري"
            name="buyer_realtor_commission"
            info="يرجى إدخال قيمة عمولة وكيل المشتري بالدولار"
            required
          />
          <Input
            form={form}
            type="number"
            numberRegex={/^\d*$/}
            label="سنة البناء"
            placeholder="أدخل سنة البناء"
            name="year_built"
            info="يرجى إدخال سنة بناء العقار"
            required
          />

          <Select
            form={form}
            label="الحالة"
            placeholder="اختر حالة العقار"
            choices={STATUS}
            keyValue="value"
            showValue="label"
            name="status"
            info="يرجى اختيار حالة العقار (جديد، مستخدم، ...)"
            required
          />
          <Select
            form={form}
            label="نوع العقد"
            placeholder="اختر نوع العقد"
            choices={TransType}
            keyValue="value"
            showValue="label"
            name="trans_type"
            info="يرجى اختيار حالة العقار (بيع، إيجار)"
            required
          />
          <Input
            form={form}
            type="date"
            label="تاريخ انتهاء العقد"
            placeholder="أدخل تاريخ انتهاء العقد"
            name="exp_date"
            info="يرجى إدخال تاريخ انتهاء العقد"
            required
          />
          <Input
            form={form}
            type="checkbox"
            label="قابل للسكن"
            placeholder="أختر قابلية السكن"
            name="livable"
            info="يرجى إختيار قابلية السكن"
            addingStyle="col-span-full"
            required
          />
          <Textarea
            form={form}
            label="وصف العقار"
            placeholder="أدخل وصف العقار"
            name="description"
            info="يرجى إدخال وصف العقار"
            addingStyle="col-span-full"
            required
          />
          <Textarea
            form={form}
            label="تعليمات المعاينة"
            placeholder="أدخل تعليمات المعاينة"
            name="show_inst"
            info="يرجى إدخال تعليمات المعاينة"
            addingStyle="col-span-full"
            required
          />
        </div>

        {/* buttons container */}
        <div className="flex justify-end w-full gap-xl">
          <NextButton id={"general_step_form"} />
        </div>
      </form>
    </AnimateContainer>
  );
}

export default GeneralStep;
