import { Fragment } from "react";

function Stepper({ stepsNumber, currentStep }) {
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
                  <div className="h-[3px] bg-backgroundColor flex-1 brightness-[0.85]"></div>
                ) : null}
                {
                  //   prev steps
                  number + 1 == currentStep ? (
                    <div className="w-[25px] h-[25px] rounded-full border-solid border border-secondColor bg-secondColor flex justify-center items-center p-1 text-whiteColor">
                      {number + 1}
                    </div>
                  ) : (
                    <div className="w-[25px] h-[25px] rounded-full border-solid border border-secondColor bg-backgroundColor flex justify-center items-center p-1 text-fontColor font-bold">
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
