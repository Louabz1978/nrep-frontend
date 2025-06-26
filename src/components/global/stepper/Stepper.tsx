import { useState } from "react";

const steps = [
  "الحالة",
  "معلومات عامة",
  "الغرف والمساحات",
  "الميزات",
  "المعلومات المالية",
  "العمولة",
  "الوكيل المسؤول",
  "ملاحظات",
];

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const [currStep, setCurrStep] = useState(currentStep);
  const firstStep = currentStep

  const handleTravelStep = (idx: number) => idx <= firstStep ? setCurrStep(idx) : setCurrStep(currStep);

  return (
    <div className="flex flex-col w-48 pr-6 pt-10 ">
      {steps.map((step, idx) => {
        const isActive = idx === currStep;
        const isCompleted = idx < currStep;
        return (
          <div key={step} className="flex flex-col relative min-h-[60px]">
            <div className="flex ">
              <div
                onClick={() => handleTravelStep(idx)}
                className={`w-4 h-4 cursor-pointer rounded-full border-2 ${
                  isActive
                    ? "bg-gold-background border-gold-background text-white"
                    : isCompleted
                    ? "bg-green-500 border-green-600 text-white"
                    : "bg-white text-white"
                }`}
              ></div>
              <span
                onClick={() => handleTravelStep(idx)}
                className={`mr-3 cursor-pointer text-base ${
                  isActive
                    ? "text-gold-background font-bold"
                    : isCompleted
                    ? "text-green-700"
                    : "text-white"
                }`}
              >
                {step}
              </span>
            </div>
            {idx !== steps.length - 1 && (
              <div
                className="absolute right-[8px] top-[15px] w-[1px] h-12 bg-gray-300 z-0"
                style={{ backgroundColor: isCompleted ? "#22c55e" : "#e5e7eb" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
