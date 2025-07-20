import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { type Dispatch, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Select from "@/components/global/form/select/Select";
import { type AdditionalInfoStepType } from "@/data/website/schema/ListingFormSchema";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import { WATERLINE } from "@/data/global/select";
import Input from "@/components/global/form/input/Input";

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
        <div className="p-[100px] pt-[24px] grid  lg:grid-cols-3 md:grid-cols-2items- justify-center gap-x-[48px] gap-y-[24px]">
          <FormSectionHeader textSize="text-size40">
            المعلومات الإضافية
          </FormSectionHeader>

          <Input
            form={form}
            label={"عدد الشرفات"}
            toggle={"hasBalcony"}
            name={"balcony"}
            placeholder={"عدد الشرفات"}
            info={"يرجى تحديد عدد الشرفات الموجودة في العقار"}
            required
          />
          <Input
            form={form}
            label={"مراوح"}
            toggle={"hasFans"}
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

          {/* Additional Options Section */}
          <div className="lg:col-span-3 md:col-span-2 padding-[20]">
            <p className="text-[24px] font-normal">
              الخيارات الاضافية
            </p>
            <div className="flex flex-row flex-wrap items-center gap-6 mt-4">
              <Input
                form={form}
                type="tags"
                label="مصعد"
                name="elevator"
                info="هل يتوفر مصعد في العقار؟"
              />
              <Input
                form={form}
                type="tags"
                label="مكيف"
                name="ac"
                info="هل يتوفر مكيف في العقار؟"
              />
              <Input
                form={form}
                type="tags"
                label="مكان مخصص لركن الآلية"
                name="parking"
                info="هل يتوفر مكان مخصص لركن السيارة؟"
              />
              <Input
                form={form}
                type="tags"
                label="حديقة"
                name="garden"
                info="هل يتوفر حديقة في العقار؟"
              />
              <Input
                form={form}
                type="tags"
                label="جاكوزي"
                name="jacuzzi"
                info="هل يتوفر جاكوزي في العقار؟"
              />
              <Input
                form={form}
                type="tags"
                label="طاقة شمسية"
                name="solar"
                info="هل يتوفر نظام طاقة شمسية؟"
              />
              <Input
                form={form}
                type="tags"
                label="مسبح"
                name="pool"
                info="هل يتوفر مسبح في العقار؟"
              />
            </div>
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
