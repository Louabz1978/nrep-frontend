import NextButton from "@/components/global/form/button/NextButton";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import ImagesInput from "@/components/global/form/imagesInput/ImagesInput";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import type { PropertyImagesStepType } from "@/data/website/schema/ListingFormSchema";
import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";
import type { UseFormReturn } from "react-hook-form";
import { PiPaperPlaneRightFill } from "react-icons/pi";

interface PropertyImagesStepProps {
  form: UseFormReturn<PropertyImagesStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  handleSubmitForm: () => void;
  disabled: boolean;
  mode: "edit" | "add";
}

const PropertyImagesStep = ({
  form,
  setCurrentStep,
  handleSubmitForm,
  disabled,
  mode,
}: PropertyImagesStepProps) => {
  // extract form utils
  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = () => {
    handleSubmitForm();
    console.log(form.watch())
  };

  return (
    <AnimateContainer className="h-full overflow-auto ">
      <form
        id="images_step_form"
        className="flex flex-col flex-1 gap-6xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* inputs */}
        <div className="flex-1">
          <div className="flex flex-col gap-3xl">
            <div className="flex flex-col flex-1 gap-0">
              <FormSectionHeader>صور العقار</FormSectionHeader>

              <ImagesInput form={form} name={"photos"} required />
            </div>
            <div className="flex justify-center md:items-center flex-col text-error font-normal">
              {mode == "add" ? (
                <p className="text-start">
                  ملاحظة : الحد الأعلى لرفع صور العقار في هذه النافذة 5 صور ,
                  لإضافة المزيد الرجاء زيارة صفحة العقار الخاصة ,
                </p>
              ) : (
                <p className="text-start">
                  ملاحظة : الحد الأعلى لرفع صور العقار في هذه النافذة 32 صورة ,
                </p>
              )}
              <p className="text-start">
                ملاحظة : الحد الأدنى لحجم الصورة 256KB , و الحد الأعلى 5MB .
              </p>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex justify-between w-full gap-4 px-[107px]">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton
            title="إرسال"
            id={"images_step_form"}
            icon={<PiPaperPlaneRightFill className="rotate-180" />}
            disabled={disabled}
          />
        </div>
      </form>
    </AnimateContainer>
  );
};

export default PropertyImagesStep;
