import type { PropertyImagesStepType } from "@/data/website/schema/ListingFormSchema";
import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";
import type { UseFormReturn } from "react-hook-form";

interface PropertyImagesStepProps {
  form: UseFormReturn<PropertyImagesStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const PropertyImagesStep = ({ form, setCurrentStep }: PropertyImagesStepProps) => {
  return (<div>Property Images Step</div>);
}

export default PropertyImagesStep;
