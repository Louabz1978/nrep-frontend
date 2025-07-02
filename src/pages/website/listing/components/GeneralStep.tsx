import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Accrodion from "@/components/global/accrodion/Accrodion";
import Input from "@/components/global/form/input/Input";
import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdRealEstateAgent } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Select from "@/components/global/form/select/Select";
import { generalFields } from "@/data/website/GeneralData";

interface GeneralStepProps {
  form: UseFormReturn<any>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}


function GeneralStep({ form, setCurrentStep }: GeneralStepProps) {
  // State for each accordion section
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);

  // Toggle handlers for each accordion
  const toggleStateFirst = () => setIsOpenFirst((prev) => !prev);
  const toggleStateSecond = () => setIsOpenSecond((prev) => !prev);
  const toggleStateThird = () => setIsOpenThird((prev) => !prev);

  // handle submit form
  const onSubmit = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Helper to render a field
  const renderField = (field: any) => {
    if (field.type === "input") {
      return (
        <div className="w-75" key={field.name}>
          <div className="flex items-center justify-center relative">
            <Input
              name={field.name}
              type="text"
              label={field.label}
              labelStyle="font-bold"
              placeholder={field.placeholder}
              errors={form.formState.errors}
              addingInputStyle="text-black"
            />
            {field.info && <IoIosInformationCircleOutline className="absolute left-[-20px]  top-[43px]" />}
          </div>
        </div>
      );
    }
    if (field.type === "select") {
      return (
        <div className="w-75" key={field.name}>
          <Select
            label={field.label}
            labelStyle="font-bold"
            name={field.name}
            placeholder={field.placeholder}
            choices={field.choices}
            setValue={form.setValue}
            trigger={form.trigger}
            watch={form.watch}
            errors={form.formState.errors}
            showValue="label"
            keyValue="value"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <PageContainer className="h-full overflow-auto">
      {/* Form */}
      <form id="general_step_form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row bg-[#FDF9EF]">
          <div className="min-h-100 flex w-full">
            <div className="rounded-lg text-black w-full mt-3">
              {/* Accordion for general property information */}
              <Accrodion
                onClick={toggleStateFirst}
                title="معلومات عامة عن العقار"
                icon={<MdRealEstateAgent />}
                isOpen={isOpenFirst}
              >
                <div>
                  {generalFields.map((row, rowIdx) => (
                    <div className="flex row mr-12 gap-35" key={rowIdx}>
                      {row.map((field) => renderField(field))}
                    </div>
                  ))}
                </div>
                <div className="mr-1 m-auto flex justify-center items-center mb-4">
                  <NextButton
                    title={"تم"}
                    id={''}
                  />
                </div>
              </Accrodion>

              {/* Accordion for property category */}
              <Accrodion
                onClick={toggleStateSecond}
                title="فئة العقار : سكني"
                icon={<HiOutlineBuildingOffice2 />}
                isOpen={isOpenSecond}
              >
                <div>
                  hello hi
                  <div>bro</div>
                  <div>bro</div>
                  <div>bro</div>
                  <div>bro</div>
                  <div>bro</div>
                </div>
              </Accrodion>

              {/* Accordion for geographic data and documents */}
              <Accrodion
                onClick={toggleStateThird}
                title="البيانات الجغرافية و المستندات"
                icon={<FiMapPin />}
                isOpen={isOpenThird}
              >
                <div>
                  hello hi
                  <div>bro</div>
                  <div>bro</div>
                  <div>bro</div>
                  <div>bro</div>
                  <div>bro</div>
                </div>
              </Accrodion>

              {/* next button */}
              <div className="flex justify-center w-full gap-4 mt-3">
                <NextButton title={"التالي"} id={"general_step_form"} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}

export default GeneralStep;