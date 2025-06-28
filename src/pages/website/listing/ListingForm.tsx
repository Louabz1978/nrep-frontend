import Stepper from "@/components/global/stepper/Stepper";
import { useMemo, useState } from "react";

function ListingForm() {
  // current step
  const [currentStep, setCurrentStep] = useState(4);

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
      <div className="flex-1"></div>
    </div>
  );
}

export default ListingForm;
