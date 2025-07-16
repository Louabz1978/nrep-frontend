import NextButton from "@/components/global/form/button/NextButton";
import Radio from "@/components/global/form/radio/Radio";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import {
  StatusOptions,
  // StatusParagraph,
} from "@/data/website/Listing/listingData";
import type { StatusStepType } from "@/data/website/schema/ListingFormSchema";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

interface StatusStepProps {
  form: UseFormReturn<StatusStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// status step component, gets: form control methods, setCurrentStep dispatch.
function StatusStep({ form, setCurrentStep }: StatusStepProps) {
  // handle submit form
  const onSubmit = (data: StatusStepType) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };

  return (
    <PageContainer className="flex-1 h-full overflow-auto">
      <form
        id="status_step_form"
        className="py-[40px] pr-[32px] pl-[100px] flex-1 flex flex-col gap-[56px] items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Header */}
        <h2 className="text-size48 font-bold text-primary-fg w-full">
          معلومات الحالة :
        </h2>

        {/*paragraph*/}
        {/* <div className="w-full text-primary-fg pr-[32px] flex flex-col gap-[16px]">
          {StatusParagraphs?.map((item, index) => {
            return (
              <p key={index} className="text-size28">
                {item}
              </p>
            );
          })}
        </div> */}

        {/* status */}
        <div className="flex flex-col items-center w-full gap-[16px]">
          <span className="font-bold text-primary-fg text-size24">الحالة:</span>

          {/* toggle active status button */}
          <div className="flex gap-[15px]">
            <Radio form={form} name="status" options={StatusOptions} />
          </div>
        </div>

        {/* next button */}
        <div className="flex justify-center w-full mt-auto">
          <NextButton title={"التالي"} id={"status_step_form"} />
        </div>
      </form>
    </PageContainer>
  );
}

export default StatusStep;
