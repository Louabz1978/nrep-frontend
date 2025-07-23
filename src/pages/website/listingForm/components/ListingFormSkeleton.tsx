import { Skeleton } from "@/components/global/ui/skeleton";
import { useState } from "react";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";

// Skeleton version of Stepper
const StepperSkeleton = ({ steps }: { steps: number }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex overflow-hidden w-full 2xl:px-[200px] xl:px-[150px] lg:px-[100px] md:px-[50px] px-0">
        {Array.from({ length: steps }).map((_, index) => (
          <Skeleton
            key={index}
            className="relative flex-1 h-12 rounded-lg"
            style={{
              clipPath:
                index === 0
                  ? steps === 1
                    ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                    : "polygon(7% 0, 100% 0, 100% 100%, 7% 100%, 0 50%)"
                  : index === steps - 1
                  ? "polygon(0 0, 100% 0, 93% 50%, 100% 100%, 0 100%, 0 0)"
                  : "polygon(0 50%, 7% 0, 100% 0, 93% 50%, 100% 100%, 7% 100%)",
              zIndex: steps - index,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Skeleton version of GeneralStep
const GeneralStepSkeleton = () => {
  return (
    <AnimateContainer>
      <div className="flex flex-col gap-6xl">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-5xl gap-y-3xl">
          <Skeleton className="col-span-full h-8 w-1/4" />
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="flex justify-end w-full gap-xl">
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </AnimateContainer>
  );
};

// Main ListingFormSkeleton component
export function ListingFormSkeleton() {
  const [currentStep] = useState(0);
  const steps = 4; // Same as your actual form steps

  return (
    <AnimateContainer>
      <PageContainer className="gap-5xl">
        <StepperSkeleton steps={steps} />

        <div className="flex-1 flex flex-col">
          {currentStep === 0 ? (
            <GeneralStepSkeleton />
          ) : currentStep === 1 ? (
            <GeneralStepSkeleton /> // Reuse same skeleton for all steps
          ) : currentStep === 2 ? (
            <GeneralStepSkeleton />
          ) : (
            <GeneralStepSkeleton />
          )}
        </div>
      </PageContainer>
    </AnimateContainer>
  );
}
