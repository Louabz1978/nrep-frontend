import type { Dispatch, SetStateAction } from "react";

export interface StepType {
  name: string;
  onClick: () => void;
}

interface StepperProps {
  currentStep: number;
  steps: StepType[];
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// Stepper component receives the setCurrentStep, currentStep and steps as props
const Stepper = ({ currentStep, steps, setCurrentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-center p-4 w-full " dir="ltr">
      {/* LTR support */}
      <div className="flex overflow-hidden w-full py-[30px] px-[200px]">
        {steps.map((step, index) => {
          // Determine step state
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          // Color classes
          const base = isActive
            ? "bg-primary text-white"
            : isCompleted
            ? "bg-primary text-white"
            : "bg-secondary text-white";
          // Only allow going back to previous steps, not forward
          // Prevent clicking on the first step if already on the first step
          const isClickable = index < currentStep && !(currentStep === 0 && index === 0);
          // Arrow shape using clip-path (LTR)
          return (
            <div
              key={step.name}
              className={`relative flex-1 flex items-center justify-center font-bold text-lg h-16 ${
                isClickable ? "cursor-pointer" : "cursor-default"
              } transition-colors duration-200 ${base} `}
              style={{
                clipPath:
                  index === 0
                    ? steps.length === 1
                      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" // single step
                      : "polygon(0 0, 93% 0, 100% 50%, 93% 100%, 0 100%)" // left arrow for first step, more angle
                    : index === steps.length - 1
                    ? "polygon(0 0, 93% 0, 100% 0, 100% 100%, 94% 100%, 0 100%, 6% 50%)" // final step: arrow on left, flat on right, more angle
                    : "polygon(0 0, 93% 0, 100% 50%, 93% 100%, 0 100%, 6% 50%)", // middle steps, more angle
                zIndex: steps.length - index,
                borderRadius: "8px",
                opacity: isClickable || isActive ? 1 : 0.7,
              }}
              onClick={() => {
                // Prevent going back from first step to itself
                if (isClickable) {
                  setCurrentStep(index);
                }
              }}
            >
              <span
                className="w-full text-center select-none"
                style={{ direction: "ltr" }}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Export the Stepper component as default
export default Stepper;
