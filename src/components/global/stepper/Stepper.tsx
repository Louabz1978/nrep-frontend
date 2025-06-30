import type { Dispatch, SetStateAction } from "react";

interface StepperProps {
  currentStep: number;
  steps: string[];
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// Stepper component receives the setCurrentStep, currentStep and steps as props
const Stepper = ({ currentStep, steps, setCurrentStep }: StepperProps) => {
  // Handler to move to a step if it's not ahead of the currentStep
  const handleTravelStep = (idx: number) =>
    idx <= currentStep ? setCurrentStep(idx) : setCurrentStep(currentStep);

  return (
    // Make the sidebar scrollable and cover all steps
    <div className="w-64 border-l border-gray-200 p-4 bg-dark-gray h-full  flex flex-col">
      <div className="flex flex-col w-48 mr-3 mt-3 flex-1 overflow-y-auto">
        {/* Map through each step to render step indicators and labels */}
        {steps.map((step, idx) => {
          // Determine if the step is active
          const isActive = idx === currentStep;
          // Determine if the step is completed
          const isCompleted = idx < currentStep;
          return (
            // Each step container
            <div
              key={step + idx}
              className="flex flex-col relative min-h-[60px]"
            >
              <div className="flex ">
                {/* Step circle indicator, clickable to travel to the step */}
                <div
                  onClick={() => handleTravelStep(idx)}
                  className={`w-4 h-4 relative z-[2] cursor-pointer rounded-full border-2 ${
                    isActive
                      ? "bg-transparent border-gold-background text-white"
                      : isCompleted
                      ? "bg-gold-background border-gold-background text-white"
                      : "bg-white text-white"
                  }`}
                ></div>
                {/* Step label, clickable to travel to the step */}
                <span
                  onClick={() => handleTravelStep(idx)}
                  className={`mr-3 cursor-pointer text-base ${
                    isActive
                      ? "text-gold-background font-bold"
                      : isCompleted
                      ? "text-gold-background"
                      : "text-white"
                  }`}
                >
                  {step}
                </span>
              </div>
              {/* Render the vertical line between steps except for the last step */}
              {idx !== steps.length - 1 && (
                <div
                  className="absolute right-[8px] top-[15px] w-[1px] h-12 bg-gray-300 z-0"
                  style={{
                    // Change line color if the step is completed
                    backgroundColor: isCompleted ? "#D4AF37" : "white",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Export the Stepper component as default
export default Stepper;
