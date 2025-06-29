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
    <form id="status_step_form" onSubmit={form?.handleSubmit(onSubmit)}>
      {/* render inputs here */}
      status
    </form>
  );
}

export default StatusStep;
