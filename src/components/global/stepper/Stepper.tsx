import { Fragment } from "react";

interface StepperProps {
  stepsNumber: number;
  currentStep: number;
}

function Stepper({ stepsNumber, currentStep }: StepperProps) {
  return (
    <div className="flex flex-row-reverse items-center py-2 md:px-0 px-3">
      {/* steps */}
      <div className="flex flex-row-reverse justify-between items-center w-[100%]">
        {Array.from(Array(stepsNumber).keys())
          .reverse()
          .map((number) => {
            return (
              <Fragment key={number}>
                {number + 1 < stepsNumber ? (
                  <div className="h-[3px] bg-background flex-1 brightness-[0.85]"></div>
                ) : null}
                {
                  //   prev steps
                  number + 1 == currentStep ? (
                    <div className="w-[25px] h-[25px] rounded-full border-solid border border-secondary bg-secondary flex justify-center items-center p-1 text-white">
                      {number + 1}
                    </div>
                  ) : (
                    <div className="w-[25px] h-[25px] rounded-full border-solid border border-secondary bg-background flex justify-center items-center p-1 text-primary-foreground font-bold">
                      {number + 1}
                    </div>
                  )
                }
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default Stepper;
