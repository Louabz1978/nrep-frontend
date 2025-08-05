import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
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
  };

  return (
    <AnimateContainer>
      <form
        id="additional_step_form"
        className="flex flex-col flex-1 gap-6xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* inputs */}
        <div className="flex-1">
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-5xl gap-y-3xl">
            <FormSectionHeader>المعلومات الإضافية</FormSectionHeader>

            <Input
              form={form}
              label={"عدد الشرفات"}
              numberRegex={/^\d*$/}
              type="number"
              toggle={"hasBalcony"}
              name={"balcony"}
              placeholder={"عدد الشرفات"}
              info={"يرجى تحديد عدد الشرفات الموجودة في العقار"}
              required
            />
            <Input
              form={form}
              label={"مراوح"}
              numberRegex={/^\d*$/}
              type="number"
              toggle={"hasFans"}
              name={"fan_number"}
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
              name={"water"}
              info="يرجى اختيار نوع خط المياه الواصل للعقار (رئيسي، خزان، بئر)"
            />

            {/* Additional Options Section */}
            <div className="col-span-full flex flex-col gap-xs">
              <p className="text-size18 font-medium text-primary-fg cursor-pointer">
                الخيارات الاضافية
              </p>
              <div className="flex flex-row flex-wrap items-center gap-lg">
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
                  name="garage"
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
                  name="solar_system"
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
        </div>

        {/* buttons */}
        <div className="flex justify-between w-full gap-xl">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton id={"additional_step_form"} />
        </div>
      </form>
    </AnimateContainer>
  );
}

export default AdditionalInfoStep;
