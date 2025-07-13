import PageContainer from "@/components/global/pageContainer/PageContainer";
import type { CompensationAndListingOfficesStepType } from "@/data/website/schema/ListingFormSchema";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

// Define props interface for the CompensationAndListingOfficesStep component
interface CompensationAndListingOfficesStepProps {
  form: UseFormReturn<CompensationAndListingOfficesStepType>; // Form methods from react-hook-form
  setCurrentStep: Dispatch<SetStateAction<number>>; // Function to update current step
}

function CompensationAndListingOfficesStep({
  form,
  setCurrentStep,
}: CompensationAndListingOfficesStepProps) {
  // extract form utils
  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = (data: CompensationAndListingOfficesStepType) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };

  return (
    <PageContainer className="h-full overflow-auto ">
      <form
        id="features_step_form"
        className="mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        compensation and listing offices step
      </form>
    </PageContainer>
  );
}

export default CompensationAndListingOfficesStep;
