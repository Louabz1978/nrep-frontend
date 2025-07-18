import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { type Dispatch, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Select from "@/components/global/form/select/Select";
import { type AdditionalInfoStepType } from "@/data/website/schema/ListingFormSchema";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import { additionOptions, NUMBERS, WATERLINE } from "@/data/global/select";

interface AdditionalInfoStepProps {
  form: UseFormReturn<AdditionalInfoStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// general step component
function AdditionalInfoStep({ form, setCurrentStep }: AdditionalInfoStepProps) {
  // extract form utils
  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = (data: AdditionalInfoStepType) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };

  return (
    <PageContainer className="h-full overflow-auto ">
      <form
        id="features_step_form"
        className="mb-10 flex flex-col gap-[80px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-[100px] pt-[24px] grid md:grid-cols-2 items- justify-center gap-x-[160px] gap-y-[24px]">
          <FormSectionHeader textSize="text-size40">
            المعلومات الإضافية
          </FormSectionHeader>

          <div className=" grid md:grid-cols-1 gap-y-[35px] ">
            <Select
              form={form}
              label={"شرفة"}
              toggle={"hasBalcony"}
              keyValue="value"
              showValue="label"
              choices={NUMBERS}
              name={"balcony"}
              placeholder={"شرفة"}
              info={"يرجى تحديد عدد الشرفات الموجودة في العقار"}
              required
            />
            <Select
              form={form}
              label={"مراوح"}
              toggle={"hasFans"}
              keyValue="value"
              showValue="label"
              choices={NUMBERS}
              name={"fans"}
              placeholder={"مراوح"}
              info={"يرجى تحديد عدد المراوح المتوفرة في العقار"}
              required
            />
            <Select
              form={form}
              label="خط المياه الواصل للعقار"
              placeholder=""
              choices={WATERLINE}
              keyValue="value"
              showValue="label"
              name={"waterLine"}
              info="يرجى اختيار نوع خط المياه الواصل للعقار (رئيسي، خزان، بئر)"
            />
          </div>
          <div className=" grid gap-y-[35px] mt-8">
            <Select
              form={form}
              keyValue="value"
              showValue="label"
              name={"additionalOptions"}
              placeholder={"اختر مواصفات أخرى للعقار"}
              multiple={true}
              choices={additionOptions}
              addingStyle=""
              info="اختر من الخيارات الإضافية المتوفرة مثل المصعد، مكيف، حديقة، جاكوزي، طاقة شمسية، مسبح وغيرها"
            />
          </div>
        </div>
        <div className="flex justify-between w-full gap-4 px-[107px]">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton id={"general_step_form"} />
        </div>
      </form>
    </PageContainer>
  );
}

export default AdditionalInfoStep;
