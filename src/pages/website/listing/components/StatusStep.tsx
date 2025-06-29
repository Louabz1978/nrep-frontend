import type { statusStepSchema } from "@/data/website/schema/ListingFormSchema";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

interface StatusStepProps {
  form: UseFormReturn<any>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// status step component, gets: form control methods, setCurrentStep dispatch.
function StatusStep({ form, setCurrentStep }: StatusStepProps) {
  console.log(form, setCurrentStep);

  // handle submit form
  const onSubmit = (data: typeof statusStepSchema) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };

  return (
    <form id="status_step_form" onSubmit={form?.handleSubmit(onSubmit)}>
      {/* render inputs here */}
    </form>
  );
}

export default StatusStep;
