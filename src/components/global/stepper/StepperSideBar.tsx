import React, { useState } from "react";
import Stepper from "./Stepper";


const StepperSideBar = ()=>{
  return (
    <div className="w-64 border-l border-gray-200 p-4 bg-dark-gray ">
        <Stepper currentStep={4} />
      </div>
  )

};

export default StepperSideBar;
