import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";
import Accrodion from "@/components/global/accrodion/Accrodion";
import Input from "@/components/global/form/input/Input";
import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdRealEstateAgent } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Select from "@/components/global/form/select/Select";

interface GeneralStepProps {
  form: UseFormReturn<any>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// Array for select options (cityChoices)
const cityChoices = [
  { value: "damascus", label: "دمشق" },
  { value: "homs", label: "حمص" },
  { value: "aleppo", label: "حلب" },
  { value: "latakia", label: "اللاذقية" },
  { value: "daraa", label: "درعا" },
  { value: "hama", label: "حماة" },
  // Add more cities as needed
];

// Array describing all rows and their fields
const generalFields = [
  [
    {
      type: "input",
      name: "propertyId",
      label: "رقم تعريف العقار",
      placeholder: "",
      info: true,
    },
    {
      type: "select",
      name: "hiddenPropertyId",
      label: "إخفاء رقم العقار",
      placeholder: "نعم",
      choices: cityChoices,
    },
    {
      type: "select",
      name: "city",
      label: "المدينة",
      placeholder: "اختر المدينة",
      choices: cityChoices,
    },
  ],
  [
    {
      type: "input",
      name: "streetName",
      label: "اسم الشارع",
      placeholder: "شارع الدبلان",
      info: true,
    },
    {
      type: "input",
      name: "streetNumber",
      label: "رقم الشارع",
      placeholder: "1234",
    },
    {
      type: "select",
      name: "streetType",
      label: "نوع الشارع",
      placeholder: "طريق عام",
      choices: cityChoices,
    },
  ],
  [
    {
      type: "select",
      name: "previousGeoDirection",
      label: "الاتجاه الجغرافي السابق",
      placeholder: "شمال",
      choices: cityChoices,
      info: false,
    },
    {
      type: "select",
      name: "nextGeoDirection",
      label: "الاتجاه الجغرافي اللاحق",
      placeholder: "شمال",
      choices: cityChoices,
    },
    {
      type: "input",
      name: "postalCode",
      label: "الرمز البريدي",
      placeholder: "33914",
    },
  ],
  [
    {
      type: "input",
      name: "buildingDesign",
      label: "نوع تصميم المبنى",
      placeholder: "",
      info: true,
    },
    {
      type: "input",
      name: "buildingNumber",
      label: "رقم المبنى",
      placeholder: "47",
      choices: cityChoices,
    },
    {
      type: "input",
      name: "apartmentNumber",
      label: "رقم الشقة",
      placeholder: "02",
    },
  ],
  [
    {
      type: "input",
      name: "geoArea",
      label: "المنطقة الجغرافية",
      placeholder: "",
      info: true,
    },
    {
      type: "input",
      name: "regulatoryCode",
      label: "كود التنظيم(العقاري)",
      placeholder: "",
    },
    {
      type: "input",
      name: "projectName",
      label: "المشروع العقاري",
      placeholder: "",
    },
  ],
  [
    {
      type: "input",
      name: "projectCode",
      label: "رمز المجمع",
      placeholder: "",
      info: true,
    },
    {
      type: "input",
      name: "projectName",
      label: "اسم المجمع السكني",
      placeholder: "",
    },
    {
      type: "input",
      name: "unitType",
      label: "نوع الوحدة العقارية",
      placeholder: "",
    },
  ],
  [
    {
      type: "input",
      name: "developerName",
      label: "اسم المطور العقاري",
      placeholder: "",
      info: true,
    },
  ],
];

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
  const renderField = (field: any, idx: number) => {
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
              addingInputStyle="mb-4 text-black"
            />
            {field.info && <IoIosInformationCircleOutline className="absolute left-[-20px] top-[43px]"/>}
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
                      {row.map((field, idx) => renderField(field, idx))}
                    </div>
                  ))}
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