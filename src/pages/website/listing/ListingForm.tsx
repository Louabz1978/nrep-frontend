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
} from "@/data/website/schema/ListingFormSchema";

function ListingForm() {
  // current step
  const [currentStep, setCurrentStep] = useState(4);

  // status step form
  const statusStep = useForm({
    resolver: joiResolver(statusStepSchema),
    defaultValues: statusStepInitialValues,
    mode: "onChange",
  });

  // general step form
  const generalStep = useForm({
    resolver: joiResolver(generalStepSchema),
    defaultValues: generalStepInitialValues,
    mode: "onChange",
  });

  // rooms step form
  const roomsStep = useForm({
    resolver: joiResolver(roomsStepSchema),
    defaultValues: roomsStepInitialValues,
    mode: "onChange",
  });

  // features step form
  const featuresStep = useForm({
    resolver: joiResolver(featuresStepSchema),
    defaultValues: featuresStepInitialValues,
    mode: "onChange",
  });

  // financial step form
  const financialStep = useForm({
    resolver: joiResolver(financialStepSchema),
    defaultValues: financialStepInitialValues,
    mode: "onChange",
  });

  // compensation step form
  const compensationStep = useForm({
    resolver: joiResolver(compensationStepSchema),
    defaultValues: compensationStepInitialValues,
    mode: "onChange",
  });

  // offices step form
  const officesStep = useForm({
    resolver: joiResolver(officesStepSchema),
    defaultValues: officesStepInitialValues,
    mode: "onChange",
  });

  // remarks step form
  const remarksStep = useForm({
    resolver: joiResolver(remarksStepSchema),
    defaultValues: remarksStepInitialValues,
    mode: "onChange",
  });

  // form steps
  const STEPS = useMemo(
    () => [
      "الحالة",
      "معلومات عامة",
      "الغرف و المساحات",
      "الميزات",
      "المعلومات العامة",
      "العمولة",
      "الوكيل المسؤول",
      "الملاحظلات",
    ],
    []
  );

  return (
    <div className="flex">
      {/* stepper */}
      <Stepper
        steps={STEPS}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {/* form steps area */}
      <div className="flex-1">
        {currentStep == 0 ? (
          <StatusStep form={statusStep} setCurrentStep={setCurrentStep} />
        ) : currentStep == 1 ? (
          <GeneralStep />
        ) : currentStep == 2 ? (
          <RoomsStep />
        ) : currentStep == 3 ? (
          <FeaturesStep />
        ) : currentStep == 4 ? (
          <FinancialStep />
        ) : currentStep == 5 ? (
          <CompensationStep />
        ) : currentStep == 6 ? (
          <OfficesStep />
        ) : (
          <RemarksStep />
        )}
      </div>
    </div>
  );
}

export default ListingForm;
