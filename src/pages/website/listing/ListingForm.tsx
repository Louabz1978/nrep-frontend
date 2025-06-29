import Stepper from "@/components/global/stepper/Stepper";
import { useState } from "react";

const steps = [
  "الحالة",
  "معلومات عامة",
  "الغرف و المساحات",
  "الميزات",
  "المعلومات المالية",
  "العمولة",
  "الوكيل المسؤول",
  "ملاحظات",
];
const [currentStep, setCurrentStep]=useState(1)

const ListingForm = () => {

  return (
    <div className="flex min-h-screen]">
      {/* Sidebar Stepper */}
      <Stepper currentStep={currentStep} steps={steps} setCurrentStep={setCurrentStep} />
      {/* Main Content */}

    </div>
  );
};

export default ListingForm;
