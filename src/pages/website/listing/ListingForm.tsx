import Stepper from "@/components/global/stepper/Stepper";
import { useMemo, useState } from "react";
import GeneralStep from "./components/GeneralStep";
import FeaturesStep from "./components/FeaturesStep";
import FinancialStep from "./components/FinancialStep";
import CompensationAndListingOfficesStep from "./components/CompensationandListingOfficesStep";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import {
  compensationAndListingOfficesStepInitialValues,
  compensationAndListingOfficesStepSchema,
  featuresStepInitialValues,
  featuresStepSchema,
  financialStepInitialValues,
  financialStepSchema,
  generalStepInitialValues,
  generalStepSchema,
  type CompensationAndListingOfficesStepType,
  type FeaturesStepType,
  type FinancialStepType,
  type GeneralStepType,
  type OfficesStepType,
  type RemarksStepType,
  type RoomsStepType,
  type StatusStepType,
} from "@/data/website/schema/ListingFormSchema";
import cleanValues from "@/utils/cleanValues";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import type { UseQueryResult } from "@tanstack/react-query";
import { type StepType } from "@/components/global/stepper/Stepper";

interface ListingFormProps {
  defaultValues: {
    status: StatusStepType;
    general: GeneralStepType;
    rooms: RoomsStepType;
    features: FeaturesStepType;
    financial: FinancialStepType;
    compensation: CompensationAndListingOfficesStepType;
    offices: OfficesStepType;
    remarks: RemarksStepType;
  };
  listingResources: UseQueryResult<unknown[]>;
}

// listing form page, gets: default values for each step in the form
function ListingForm({ defaultValues }: ListingFormProps) {
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

  // features step form
  const featuresStep = useForm({
    resolver: joiResolver(featuresStepSchema),
    defaultValues: cleanValues(
      featuresStepInitialValues,
      defaultValues?.features
    ),
    mode: "onChange",
  });

  // financial step form
  const financialStep = useForm({
    resolver: joiResolver(financialStepSchema),
    defaultValues: cleanValues(
      financialStepInitialValues,
      defaultValues?.financial
    ),
    mode: "onChange",
  });

  // compensation and listing offices step form
  const compensationAndListingOfficesStep = useForm({
    resolver: joiResolver(compensationAndListingOfficesStepSchema),
    defaultValues: cleanValues(
      compensationAndListingOfficesStepInitialValues,
      defaultValues?.compensation
    ),
    mode: "onChange",
  });

  // steps
  const Steps: StepType[] = useMemo(
    () => [
      {
        name: "معلومات عامة",
        onClick: async () => null,
      },
      {
        name: "الغرف والميزات",
        onClick: async () => {
          const isValid = await generalStep.trigger();
          if (isValid) setCurrentStep(1);
        },
      },
      {
        name: "العمولة",
        onClick: async () => {
          const isValid = await featuresStep.trigger();
          if (isValid) setCurrentStep(2);
        },
      },
      {
        name: "الوكيل المسؤول",
        onClick: async () => {
          const isValid = await compensationAndListingOfficesStep.trigger();
          if (isValid) setCurrentStep(3);
        },
      },
    ],
    [
      generalStep,
      featuresStep,
      financialStep,
      compensationAndListingOfficesStep,
    ]
  );

  // handle submit all form steps
  const handleSubmitForm = () => {
    console.log({
      ...generalStep.watch(),
      ...featuresStep.watch(),
      ...financialStep.watch(),
      ...compensationAndListingOfficesStep.watch(),
    });
  };

  return (
    <PageContainer className="!flex-row">
      {/* stepper */}
      <Stepper
        steps={Steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {/* form steps area */}
      <div className="flex-1 h-full overflow-auto">
        {currentStep == 0 ? (
          <GeneralStep form={generalStep} setCurrentStep={setCurrentStep} />
        ) : currentStep == 1 ? (
          <FeaturesStep form={featuresStep} setCurrentStep={setCurrentStep} />
        ) : currentStep == 2 ? (
          <FinancialStep form={financialStep} setCurrentStep={setCurrentStep} />
        ) : (
          <CompensationAndListingOfficesStep
            form={compensationAndListingOfficesStep}
            setCurrentStep={setCurrentStep}
            handleSubmitForm={handleSubmitForm}
          />
        )}
      </div>
    </PageContainer>
  );
}

export default ListingForm;
