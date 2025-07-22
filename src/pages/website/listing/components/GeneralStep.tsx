import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { type Dispatch, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import { type GeneralStepType } from "@/data/website/schema/ListingFormSchema";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import { cityChoices, PROPERTYTYPE, STATUS } from "@/data/global/select";

interface GeneralStepProps {
  form: UseFormReturn<GeneralStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// general step component
function GeneralStep({ form, setCurrentStep }: GeneralStepProps) {
  // extract form utils
  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = (data: GeneralStepType) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };

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
            type="number"
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
            placeholder="أدخل رقم الطابق"
            name="floor"
            info="يرجى إدخال رقم الطابق الذي يقع فيه العقار"
            required
          />
          <Input
            form={form}
            type="number"
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
            name="county"
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
            name="district"
            info="يرجى اختيار الحي أو المنطقة التي يقع فيها العقار"
            required
          />
          <Select
            form={form}
            label="نوع العقار"
            placeholder="اختر نوع العقار"
            choices={PROPERTYTYPE}
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
          <Input
            form={form}
            type="number"
            label="عمولة وكيل البائع ($)"
            placeholder="أدخل عمولة وكيل البائع"
            name="property_realtor_commission"
            info="يرجى إدخال قيمة عمولة وكيل البائع بالدولار"
            required
          />
          <Input
            form={form}
            type="number"
            label="عمولة وكيل المشتري ($)"
            placeholder="أدخل عمولة وكيل المشتري"
            name="buyer_realtor_commission"
            info="يرجى إدخال قيمة عمولة وكيل المشتري بالدولار"
            required
          />
          <Input
            form={form}
            type="number"
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
