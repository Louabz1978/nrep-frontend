import Stepper from "@/components/global/stepper/Stepper";
import { useMemo, useState } from "react";
import GeneralStep from "./components/GeneralStep";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import {
  additionalInfoStepInitialValues,
  additionalInfoStepSchema,
  generalStepInitialValues,
  generalStepSchema,
  LocationStepInitialValues,
  LocationStepSchema,
  PropertyImagesStepInitialValues,
  propertyImagesStepSchema,
  type AdditionalInfoStepType,
  type GeneralStepType,
  type LocationStepType,
  type PropertyImagesStepType,
} from "@/data/website/schema/ListingFormSchema";
import cleanValues from "@/utils/cleanValues";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import { type StepType } from "@/components/global/stepper/Stepper";
import AdditionalInfoStep from "./components/AdditionalInfoStep";
import LocationStep from "./components/LocationStep";
import PropertyImagesStep from "./components/PropertyImagesStep";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { useAddListings } from "@/hooks/website/listing/useAddListing";
import { useEditListings } from "@/hooks/website/listing/useEditListing";

interface ListingFormProps {
  defaultValues: {
    general: GeneralStepType;
    additionalInfo: AdditionalInfoStepType;
    location: LocationStepType;
    propertyImages: PropertyImagesStepType;
  };
  id?: number;
}

// listing form page, gets: default values for each step in the form
function ListingForm({ defaultValues, id }: ListingFormProps) {
  // current step
  const [currentStep, setCurrentStep] = useState(0);

  // general step form
  const generalStep = useForm({
    resolver: joiResolver(generalStepSchema),
    defaultValues: cleanValues(
      generalStepInitialValues,
      defaultValues?.general
    ),
    mode: "onChange",
  });
  const additionalInfoStep = useForm({
    resolver: joiResolver(additionalInfoStepSchema),
    defaultValues: cleanValues(
      additionalInfoStepInitialValues,
      defaultValues?.additionalInfo
    ),
    mode: "onChange",
  });
  const locationStep = useForm({
    resolver: joiResolver(LocationStepSchema),
    defaultValues: cleanValues(
      LocationStepInitialValues,
      defaultValues?.location
    ),
    mode: "onChange",
  });
  const propertyImagesStep = useForm({
    resolver: joiResolver(propertyImagesStepSchema),
    defaultValues: cleanValues(
      PropertyImagesStepInitialValues,
      defaultValues?.propertyImages
    ),
    mode: "onChange",
  });

  // steps
  const Steps: StepType[] = useMemo(
    () => [
      {
        name: "معلومات عامة",
        onClick: async () => {
          setCurrentStep(0);
        },
      },
      {
        name: "معلومات إضافية",
        onClick: async () => {
          const isValid = await generalStep.trigger();
          if (isValid) setCurrentStep(1);
        },
      },
      {
        name: "معلومات الموقع",
        onClick: async () => {
          const isValid = await additionalInfoStep.trigger();
          if (isValid) setCurrentStep(2);
        },
      },
      {
        name: "صور العقار",
        onClick: async () => {
          const isValid = await locationStep.trigger();
          if (isValid) setCurrentStep(3);
        },
      },
    ],

    [generalStep, additionalInfoStep, locationStep]
  );

  // listing form mutations
  const { addListing, handleAddListing } = useAddListings();
  const { editListing, handleEditListing } = useEditListings();

  // handle submit all form steps
  const handleSubmitForm = () => {
    // edit
    if (id)
      handleEditListing(
        {
          ...generalStep.watch(),
          ...additionalInfoStep.watch(),
          ...locationStep.watch(),
          ...propertyImagesStep.watch(),
        },
        id
      ).catch(console.error);
    // add
    else
      handleAddListing({
        ...generalStep.watch(),
        ...additionalInfoStep.watch(),
        ...locationStep.watch(),
        ...propertyImagesStep.watch(),
      }).catch(console.error);
  };

  return (
    <AnimateContainer>
      <PageContainer className="gap-5xl">
        {/* stepper */}
        <Stepper
          steps={Steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        {/* form steps area */}
        <div className="flex-1 flex flex-col">
          {currentStep == 0 ? (
            <GeneralStep form={generalStep} setCurrentStep={setCurrentStep} />
          ) : currentStep == 1 ? (
            <AdditionalInfoStep
              form={additionalInfoStep}
              setCurrentStep={setCurrentStep}
            />
          ) : currentStep == 2 ? (
            <LocationStep form={locationStep} setCurrentStep={setCurrentStep} />
          ) : (
            <PropertyImagesStep
              form={propertyImagesStep}
              setCurrentStep={setCurrentStep}
              handleSubmitForm={handleSubmitForm}
              disabled={id ? editListing?.isPending : addListing?.isPending}
            />
          )}
        </div>
      </PageContainer>
    </AnimateContainer>
  );
}

export default ListingForm;
