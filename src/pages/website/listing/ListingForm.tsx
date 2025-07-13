import Stepper from "@/components/global/stepper/Stepper";
import { useMemo, useState } from "react";
import StatusStep from "./components/StatusStep";
import GeneralStep from "./components/GeneralStep";
import RoomsStep from "./components/RoomsStep";
import FeaturesStep from "./components/FeaturesStep";
import FinancialStep from "./components/FinancialStep";
import CompensationStep from "./components/CompensationStep";
import OfficesStep from "./components/OfficesStep";
import RemarksStep from "./components/RemarksStep";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import {
  compensationStepInitialValues,
  compensationStepSchema,
  featuresStepInitialValues,
  featuresStepSchema,
  financialStepInitialValues,
  financialStepSchema,
  generalStepInitialValues,
  generalStepSchema,
  officesStepInitialValues,
  officesStepSchema,
  remarksStepInitialValues,
  remarksStepSchema,
  roomsStepInitialValues,
  roomsStepSchema,
  statusStepInitialValues,
  statusStepSchema,
  type CompensationStepType,
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
    compensation: CompensationStepType;
    offices: OfficesStepType;
    remarks: RemarksStepType;
  };
  listingResources: UseQueryResult<unknown[]>;
}

// listing form page, gets: default values for each step in the form
function ListingForm({ defaultValues }: ListingFormProps) {
  // current step


  const [currentStep, setCurrentStep] = useState(4);


  // status step form
  const statusStep = useForm({
    resolver: joiResolver(statusStepSchema),
    defaultValues: cleanValues<StatusStepType>(
      statusStepInitialValues,
      defaultValues?.status
    ),
    mode: "onChange",
  });

  // general step form
  const generalStep = useForm({
    resolver: joiResolver(generalStepSchema),
    defaultValues: cleanValues(
      generalStepInitialValues,
      defaultValues?.general
    ),
    mode: "onChange",
  });

  // rooms step form
  const roomsStep = useForm({
    resolver: joiResolver(roomsStepSchema),
    defaultValues: cleanValues(roomsStepInitialValues, defaultValues?.rooms),
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

  console.log(financialStepSchema)

  // compensation step form
  const compensationStep = useForm({
    resolver: joiResolver(compensationStepSchema),
    defaultValues: cleanValues(
      compensationStepInitialValues,
      defaultValues?.compensation
    ),
    mode: "onChange",
  });

  // offices step form
  const officesStep = useForm({
    resolver: joiResolver(officesStepSchema),
    defaultValues: cleanValues(
      officesStepInitialValues,
      defaultValues?.offices
    ),
    mode: "onChange",
  });

  // remarks step form
  const remarksStep = useForm({
    resolver: joiResolver(remarksStepSchema),
    defaultValues: cleanValues(
      remarksStepInitialValues,
      defaultValues?.remarks
    ),
    mode: "onChange",
  });

  // steps
  const Steps: StepType[] = useMemo(
    () => [
      {
        name: "الحالة",
        onClick: async () => null,
      },
      {
        name: "معلومات عامة",
        onClick: async () => {
          const isValid = await statusStep.trigger();
          if (isValid) setCurrentStep(1);
        },
      },
      {
        name: "الميزات",
        onClick: async () => {
          const isValid = await generalStep.trigger();
          if (isValid) setCurrentStep(2);
        },
      },
      {
        name: "الغرف و المساحات",
        onClick: async () => {
          const isValid = await featuresStep.trigger();
          if (isValid) setCurrentStep(3);
        },
      },
      {
        name: "العمولة",
        onClick: async () => {
          const isValid = await roomsStep.trigger();
          if (isValid) setCurrentStep(4);
        },
      },
      {
        name: "المعلومات المالية",
        onClick: async () => {
          const isValid = await financialStep.trigger();
          if (isValid) setCurrentStep(5);
        },
      },
      {
        name: "الوكيل المسؤول",
        onClick: async () => {
          const isValid = await compensationStep.trigger();
          if (isValid) setCurrentStep(6);
        },
      },
      {
        name: "ملاحظات",
        onClick: async () => {
          const isValid = await officesStep.trigger();
          if (isValid) setCurrentStep(7);
        },
      },
    ],
    [
      statusStep,
      generalStep,
      featuresStep,
      roomsStep,
      financialStep,
      compensationStep,
      officesStep,
    ]
  );

  // handle submit all form steps
  const handleSubmitForm = () => {
    console.log({
      ...statusStep.watch(),
      ...generalStep.watch(),
      ...roomsStep.watch(),
      ...featuresStep.watch(),
      ...financialStep.watch(),
      ...compensationStep.watch(),
      ...officesStep.watch(),
      ...remarksStep.watch(),
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
          <StatusStep form={statusStep} setCurrentStep={setCurrentStep} />
        ) : currentStep == 1 ? (
          <GeneralStep form={generalStep} setCurrentStep={setCurrentStep} />
        ) : currentStep == 2 ? (
          <FeaturesStep form={featuresStep} setCurrentStep={setCurrentStep} />
        ) : currentStep == 3 ? (
          <RoomsStep
            form={roomsStep}
            setCurrentStep={setCurrentStep}
            handleSubmitForm={handleSubmitForm}
          />
        ) : currentStep == 4 ? (
          <FinancialStep form={financialStep} setCurrentStep={setCurrentStep} />
        ) : currentStep == 5 ? (
          <CompensationStep />
        ) : currentStep == 6 ? (
          <OfficesStep />
        ) : (
          <RemarksStep />
        )}
      </div>
    </PageContainer>
  );
}

export default ListingForm;
