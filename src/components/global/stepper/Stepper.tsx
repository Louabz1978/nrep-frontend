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
    // Make the sidebar scrollable and cover all steps
    <div className="w-[304px] border-l border-gray-200 p-4 bg-quaternary-bg h-full  flex flex-col">
      <div className="flex flex-col gap-[40px] p-3 flex-1 overflow-y-auto">
        {/* Map through each step to render step indicators and labels */}
        {steps.map((step, index) => {
          // Determine if the step is active
          const isActive = index === currentStep;
          // Determine if the step is completed
          const isCompleted = index < currentStep;
          return (
            // Each step container
            <div
              key={step?.name + index}
              className="flex group flex-col group relative"
            >
              <div className="flex gap-[12px] items-center">
                {/* Step circle indicator, clickable to travel to the step */}
                <div className="!w-[32px] min-w-[32px] h-max flex justify-center items-center">
                  <div
                    onClick={() =>
                      index <= currentStep
                        ? setCurrentStep(index)
                        : index == currentStep + 1
                        ? step?.onClick?.()
                        : null
                    }
                    className={`aspect-square flex p-[6px] relative z-[2] cursor-pointer rounded-full border transition-all duration-[0.3s] ${
                      isActive
                        ? "border-secondary text-quaternary-fg w-full bg-quaternary-bg"
                        : isCompleted
                        ? "bg-primary border-primary text-quaternary-fg w-[16px]"
                        : "bg-quaternary-fg text-quaternary-fg w-[16px]"
                    }`}
                  >
                    {isActive ? (
                      <div className="size-full bg-secondary rounded-full" />
                    ) : null}
                  </div>
                </div>

                {/* Step label, clickable to travel to the step */}
                <span
                  onClick={() =>
                    index <= currentStep
                      ? setCurrentStep(index)
                      : index == currentStep + 1
                      ? step?.onClick?.()
                      : null
                  }
                  className={`cursor-pointer text-size18 leading-[16px] text-base ${
                    isActive
                      ? "text-secondary font-bold"
                      : isCompleted
                      ? "text-primary"
                      : "text-quaternary-fg"
                  }`}
                >
                  {step?.name}
                </span>
              </div>
              {/* Render the vertical line between steps except for the last step */}
              <div className="absolute group-last:hidden w-[32px] z-0 right-0 top-0 h-[calc(100%_+_40px)] flex justify-center">
                <div
                  className={`group-last:hidden w-[1px] ${
                    isCompleted ? "bg-primary" : "bg-quaternary-fg"
                  } h-full transition-all duration-[0.3s]`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Export the Stepper component as default
export default Stepper;
