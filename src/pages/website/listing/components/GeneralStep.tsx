import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { type Dispatch, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import { type GeneralStepType } from "@/data/website/schema/ListingFormSchema";

import PreviouseButton from "@/components/global/form/button/PreviouseButton";

import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import { cityChoices, STATUS } from "@/data/global/select";

interface GeneralStepProps {
  form: UseFormReturn<GeneralStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// general step component
function GeneralStep({ form, setCurrentStep }: GeneralStepProps) {

    // extract form utils
    const { handleSubmit } = form;

    // handle submit form
  const onSubmit = (data: GeneralStepType) =>{
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };

  return (
    <PageContainer className="h-full overflow-auto ">
      <form id="features_step_form" className="mb-10 flex flex-col gap-[80px]" onSubmit={handleSubmit(onSubmit)} >
        <div className="p-[48px] pt-[24px] grid md:grid-cols-3 gap-x-[48px] gap-y-[24px]">
          <FormSectionHeader textSize="text-size40">
            المعلومات العامة
          </FormSectionHeader>
          <Input
            form={form}
            type="number"
            label="رقم البناء"
            placeholder="أدخل رقم البناء"
            name="buildingNumber"
            info="يرجى إدخال رقم البناء كما هو موضح في العنوان الرسمي"
            required
          />
          <Input
            form={form}
            type="text"
            label="اسم الشارع"
            placeholder="أدخل اسم الشارع"
            name="streetName"
            info="يرجى إدخال اسم الشارع الذي يقع فيه العقار"
            required
          />
          <Input
            form={form}
            type="text"
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
            name="apartmentNumber"
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
            name="governorate"
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
          <Select
            form={form}
            label="الحي/المنطقة"
            placeholder="اختر الحي أو المنطقة"
            choices={cityChoices}
            keyValue="value"
            showValue="label"
            name="district"
            info="يرجى اختيار الحي أو المنطقة التي يقع فيها العقار"
            required
          />
          <Select
            form={form}
            label="نوع العقار"
            placeholder="اختر نوع العقار"
            choices={cityChoices}
            keyValue="value"
            showValue="label"
            name="propertyType"
            info="يرجى اختيار نوع العقار (شقة، فيلا، أرض، ...)"
            required
          />
          <Input
            form={form}
            type="number"
            label="مساحة العقار (م²)"
            placeholder="أدخل مساحة العقار"
            name="propertyArea"
            info="يرجى إدخال المساحة الكلية للعقار بالمتر المربع"
            required
          />
          <Input
            form={form}
            type="number"
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
            label="عمولة عميل البائع ($)"
            placeholder="أدخل عمولة عميل البائع"
            name="sellerCommission"
            info="يرجى إدخال قيمة عمولة عميل البائع بالدولار"
            required
          />
          <Input
            form={form}
            type="number"
            label="عمولة عميل المشتري ($)"
            placeholder="أدخل عمولة عميل المشتري"
            name="buyerCommission"
            info="يرجى إدخال قيمة عمولة عميل المشتري بالدولار"
            required
          />
          <Input
            form={form}
            type="number"
            label="سنة البناء"
            placeholder="أدخل سنة البناء"
            name="buildYear"
            info="يرجى إدخال سنة بناء العقار"
            required
          />
          <Input
            form={form}
            type="number"
            label="خطوط العرض للعقار"
            placeholder="أدخل إحداثيات خطوط العرض"
            name="latitude"
            info="يرجى إدخال إحداثيات خطوط العرض لموقع العقار"
            required
          />
          <Input
            form={form}
            type="number"
            label="خطوط الطول للعقار"
            placeholder="أدخل إحداثيات خطوط الطول"
            name="longitude"
            info="يرجى إدخال إحداثيات خطوط الطول لموقع العقار"
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
        <div className="flex justify-between w-full gap-4 px-[107px]">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton id={"general_step_form"} />
        </div>
      </form>
    </PageContainer>
  );
}

export default GeneralStep;
