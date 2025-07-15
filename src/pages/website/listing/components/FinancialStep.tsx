import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import Input from "@/components/global/form/input/Input";
import type { UseFormReturn } from "react-hook-form";
import type { FinancialStepType } from "@/data/website/schema/ListingFormSchema";
import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";
import Select from "@/components/global/form/select/Select";
import { geoDirections } from "@/data/website/GeneralData";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import NextButton from "@/components/global/form/button/NextButton";
import { moreFinancialOptions, moreRestrictionsOptions } from "@/data/website/Listing/listingData";

interface FinancialStepProps {
  form: UseFormReturn<FinancialStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

function FinancialStep({ form, setCurrentStep }: FinancialStepProps) {
  // extract form utils
  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = (data: FinancialStepType) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };
  return (
    <PageContainer className="flex-1 h-full overflow-auto">
      <form
        id="Finanical_step_form"
        className="mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSectionHeader textSize="text-size40">
          المعلومات المالية
        </FormSectionHeader>
        <div className="p-[75px] pt-[10px] grid md:grid-cols-2 gap-x-[160px] gap-y-[24px]">
          <FormSectionHeader textSize="text-size32">
            الوصف الضريبي
          </FormSectionHeader>
          <Input
            form={form}
            type="number"
            label="إجمالي الفاتورة الضريبية"
            placeholder="أدخل إجمالي الفاتورة الضريبية"
            name={"totalTaxBill"}
            info="أدخل القيمة الإجمالية للفاتورة الضريبية للعقار"
            required
          />
          <Input
            form={form}
            type="date"
            label="السنة الضريبية"
            placeholder="أدخل السنة الضريبية"
            name={"taxYear"}
            info="حدد السنة التي تخص الفاتورة الضريبية"
            required
          />
          <Select
            form={form}
            label="نوع منطقة الضرائب"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name={"taxAreaType"}
            placeholder="اختر نوع منطقة الضرائب"
            info="حدد نوع المنطقة التي ينتمي إليها العقار من الناحية الضريبية"
            required
          />
          <Select
            form={form}
            label="وصف الضريبة"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name={"taxDescription"}
            placeholder="اختر وصف الضريبة"
            info="اختر وصف الضريبة المطبقة على العقار"
            required
          />

          <FormSectionHeader textSize="text-size32">
            الرسوم المالية
          </FormSectionHeader>
          <div className="col-span-full flex justify-center">
            <Select
              form={form}
              keyValue="value"
              showValue="label"
              name={"moreFinancialOptions"}
              placeholder={"اختر مواصفات أخرى للرسوم المالية"}
              multiple={true}
              choices={moreFinancialOptions}
              addingStyle="!w-[60%]"
              info={"hello"}
            />
          </div>
          <Select
            form={form}
            label="وصف اتحاد المُلّاك (HOA)"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name="hoaDescription"
            placeholder=""
            info="اختر وصف اتحاد المُلّاك (HOA) للعقار"
          />
          <Input
            form={form}
            type="number"
            label="رقم هاتف إدارة الجمعية"
            placeholder=""
            name="hoaPhone"
            info="أدخل رقم هاتف إدارة اتحاد المُلّاك (HOA)"
          />
          <Input
            form={form}
            type="number"
            label="رسوم اتحاد المُلّاك الرئيسي ($)"
            placeholder=""
            name="mainHoaFee"
            info="أدخل قيمة رسوم اتحاد المُلّاك الرئيسي بالدولار"
            required
          />
          <Select
            form={form}
            label="تكرار رسوم اتحاد المُلّاك الرئيسي"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name="mainHoaFeeFrequency"
            placeholder=""
            info="حدد تكرار دفع رسوم اتحاد المُلّاك الرئيسي"
          />
          <Input
            form={form}
            type="number"
            label="رسوم اتحاد المُلّاك ($)"
            placeholder=""
            name="hoaFee"
            info="أدخل قيمة رسوم اتحاد المُلّاك"
            required
          />
          <Select
            form={form}
            label="تكرار رسوم اتحاد المُلّاك"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name="hoaFeeFrequency"
            placeholder=""
            info="حدد تكرار دفع رسوم اتحاد المُلّاك"
          />
          <Input
            form={form}
            type="number"
            label="رسوم النادي الإلزامية ($)"
            placeholder=""
            name="mandatoryClubFee"
            info="أدخل قيمة رسوم النادي الإلزامية"
            required
          />
          <Select
            form={form}
            label="تكرار رسوم النادي الإلزامية"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name="mandatoryClubFeeFrequency"
            placeholder=""
            info="حدد تكرار دفع رسوم النادي الإلزامية"
          />
          <Input
            form={form}
            type="number"
            label="رسوم الشقة ($)"
            placeholder=""
            name="apartmentFee"
            info="أدخل قيمة رسوم الشقة"
            required
          />
          <Select
            form={form}
            label="تكرار رسوم الشقة"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name="apartmentFeeFrequency"
            placeholder=""
            info="حدد تكرار دفع رسوم الشقة"
          />
          <Input
            form={form}
            type="number"
            label="رسوم الإيجار الترفيهي ($)"
            placeholder=""
            name="recreationalRentalFee"
            info="أدخل قيمة رسوم الإيجار الترفيهي"
            required
          />
          <Select
            form={form}
            label="تكرار رسوم الإيجار الترفيهي"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name="recreationalRentalFeeFrequency"
            placeholder=""
            info="حدد تكرار دفع رسوم الإيجار الترفيهي"
          />
          <Input
            form={form}
            type="number"
            label="رسوم التقييم الخاص ($)"
            placeholder=""
            name="specialAssessmentFee"
            info="أدخل قيمة رسوم التقييم الخاص"
            required
          />
          <Select
            form={form}
            label="تكرار رسوم التقييم الخاص"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name="specialAssessmentFeeFrequency"
            placeholder=""
            info="حدد تكرار دفع رسوم التقييم الخاص"
          />
          <Input
            form={form}
            type="number"
            label="رسوم أخرى ($)"
            placeholder=""
            name="otherFee"
            info="أدخل قيمة أي رسوم أخرى"
            required
          />
          <Select
            form={form}
            label="تكرار الرسوم الأخرى"
            choices={geoDirections}
            showValue="label"
            keyValue="value"
            name="otherFeeFrequency"
            placeholder=""
            info="حدد تكرار دفع الرسوم الأخرى"
          />

          <FormSectionHeader textSize="text-size32">
            رسوم لمرة واحدة
          </FormSectionHeader>
          <Input
            form={form}
            type="number"
            label="رسوم النادي الإلزامي لمرة واحدة ($)"
            placeholder=""
            name="mandatoryClubFeeOnce"
            info="أدخل قيمة رسوم النادي الإلزامي لمرة واحدة"
            required
          />
          <Input
            form={form}
            type="number"
            label="رسوم تأجير الأرض لمرة واحدة ($)"
            placeholder=""
            name="landLeaseFeeOnce"
            info="أدخل قيمة رسوم تأجير الأرض لمرة واحدة"
            required
          />
          <Input
            form={form}
            type="number"
            label="رسوم التأجير الترفيهي لمرة واحدة ($)"
            placeholder=""
            name="recreationalRentalFeeOnce"
            info="أدخل قيمة رسوم التأجير الترفيهي لمرة واحدة"
            required
          />
          <Input
            form={form}
            type="number"
            label="رسوم أخرى لمرة واحدة ($)"
            placeholder=""
            name="otherFeeOnce"
            info="أدخل قيمة أي رسوم أخرى لمرة واحدة"
            required
          />
          <Input
            form={form}
            type="number"
            label="رسوم التقييم الخاص لمرة واحدة ($)"
            placeholder=""
            name="specialAssessmentFeeOnce"
            info="أدخل قيمة رسوم التقييم الخاص لمرة واحدة"
            required
          />
          <FormSectionHeader textSize="text-size32">
            رسوم إضافية
          </FormSectionHeader>
          <Input
            form={form}
            type="number"
            label="رسوم التحويل ($)"
            placeholder=""
            name="transferFee"
            info="أدخل قيمة رسوم التحويل"
            required
          />
          <Input
            form={form}
            type="number"
            label="رسوم التقديم ($)"
            placeholder=""
            name="applicationFee"
            info="أدخل قيمة رسوم التقديم"
            required
          />
          <Input
            form={form}
            label="الحد الأدنى السنوي للطعام والمشروبات"
            placeholder=""
            name="annualFoodBeverageMinimum"
            info="أدخل الحد الأدنى السنوي للطعام والمشروبات"
            required
          />
          <FormSectionHeader textSize="text-size32">
            القيود المرتبطة بالتأجير
          </FormSectionHeader>
          <div className="col-span-full flex justify-center">
            <Select
              form={form}
              keyValue="value"
              showValue="label"
              name={"moreRestrictionsOptions"}
              placeholder={"اختر قيود أخرى"}
              multiple={true}
              choices={moreRestrictionsOptions}
              addingStyle="!w-[60%]"
              info={"اختر قيود أخرى"}
            />
          </div>
          <Input
            form={form}
            type="number"
            label="عدد عقود الإيجار في السنة"
            placeholder=""
            name="numberOfLeasesPerYear"
            info="أدخل عدد عقود الإيجار في السنة"
          />
          <Input
            form={form}
            type="number"
            label="الحد الأدنى لأيام الإيجار"
            placeholder=""
            name="minimumLeaseDays"
            info="أدخل الحد الأدنى لأيام الإيجار"
          />
          <Input
            form={form}
            type="number"
            label="رسوم تأجير الأرض ($)"
            placeholder=""
            name="landLeaseFee"
            info="أدخل قيمة رسوم تأجير الأرض"
            required
          />
          <Input
            form={form}
            type="number"
            label="تكرار رسوم تأجير الأرض"
            placeholder=""
            name="landLeaseFeeFrequency"
            info="حدد تكرار دفع رسوم تأجير الأرض"
          />

          <FormSectionHeader textSize="text-size32">
            القيود القانونية
          </FormSectionHeader>
          <Input
            form={form}
            label="خاضع لقانون FIRPTA"
            placeholder=""
            name="subjectToFIRPTA"
            info="حدد إذا كان العقار خاضع لقانون FIRPTA"
            required
          />
          <Input
            form={form}
            label="خاضع لعقد إيجار"
            placeholder=""
            name="subjectToLease"
            info="حدد إذا كان العقار خاضع لعقد إيجار"
            required
          />
          <Input
            form={form}
            label="وصف عقد الإيجار"
            placeholder=""
            name="leaseDescription"
            info="أدخل وصف عقد الإيجار"
          />
          <Input
            form={form}
            type="date"
            label="تاريخ انتهاء عقد الإيجار"
            placeholder=""
            name="leaseExpirationDate"
            info="أدخل تاريخ انتهاء عقد الإيجار"
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

export default FinancialStep;
