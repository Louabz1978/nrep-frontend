import NextButton from "@/components/global/form/button/NextButton";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import ImagesInput from "@/components/global/form/imagesInput/ImagesInput";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import type { PropertyImagesStepType } from "@/data/website/schema/ListingFormSchema";
import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";
import type { UseFormReturn } from "react-hook-form";

interface PropertyImagesStepProps {
  form: UseFormReturn<PropertyImagesStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  handleSubmitForm: () => void;
}

const PropertyImagesStep = ({
  form,
  setCurrentStep,
  handleSubmitForm,
}: PropertyImagesStepProps) => {
  // extract form utils
  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = (data: PropertyImagesStepType) => {
    handleSubmitForm();
    console.log(data);
  };

  return (
    <PageContainer className="h-full overflow-auto ">
      <form
        id="images_step_form"
        className="mb-10 flex flex-col gap-[80px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-[40px]">
          <ImagesInput form={form} name={"images"} />
        </div>
        <div className="flex justify-between w-full gap-4 px-[107px]">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton title="إرسال" id={"images_step_form"} />
        </div>
      </form>
    </PageContainer>
  );
};

export default PropertyImagesStep;
