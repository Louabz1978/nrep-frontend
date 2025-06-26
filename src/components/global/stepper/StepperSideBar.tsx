import React from "react";
import Stepper from "./Stepper";


const StepperSideBar = ()=>{

  const steps = [
    "الحالة",
    "معلومات عامة",
    "الغرف و المساحات",
    "الميزات",
    "المعلومات العامة",
    "العمولة",
    "الوكيل المسؤول",
    "الملاحظلات",
  ]

  return (

        <Stepper steps={steps} currentStep={4} />
  )

};

export default StepperSideBar;
