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
import Select from "@/components/global/form/select/Select";
import { cityChoices } from "@/data/website/GeneralData";

interface GeneralStepProps {
  form: UseFormReturn<any>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

function GeneralStep({ form, setCurrentStep }: GeneralStepProps) {
  // extract form utils
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
  } = form;
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

  console.log(form);

  return (
    <PageContainer className="h-full overflow-auto">
      {/* Form */}
      <form id="general_step_form" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="ps-[39px] pe-[71px] grid lg:grid-cols-3 md:grid-cols-2 gap-x-[72px] gap-y-[56px]">
                  <Input
                    errors={errors}
                    label={"رقم تعريف العقار"}
                    placeholder={""}
                    name={"propertyId"}
                    type={"number"}
                    setValue={setValue}
                    trigger={trigger}
                    register={register}
                    info={"hello"}
                  />
                  <Select
                    label={"إخفاء رقم العقار"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"hiddenPropertyId"}
                    placeholder={"نعم"}
                    info={"hello"}
                  />
                  <Select
                    label={"المدينة"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"city"}
                    placeholder={"اختر المدينة"}
                    info={"hello"}
                  />

                  <Input
                    errors={errors}
                    label={"اسم الشارع"}
                    placeholder={"شارع الدبلان"}
                    name={"streetName"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"رقم الشارع"}
                    placeholder={"1234"}
                    name={"streetNumber"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Select
                    label={"نوع الشارع"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"streetType"}
                    placeholder={"طريق عام"}
                    info={"hello"}
                  />

                  <Select
                    label={"الاتجاه الجغرافي السابق"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"previousGeoDirection"}
                    placeholder={"شمال"}
                    info={"hello"}
                  />
                  <Select
                    label={"الاتجاه الجغرافي اللاحق"}
                    trigger={trigger}
                    setValue={setValue}
                    watch={watch}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    register={register}
                    errors={errors}
                    name={"nextGeoDirection"}
                    placeholder={"شمال"}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"الرمز البريدي"}
                    placeholder={"33914"}
                    name={"postalCode"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />

                  <Input
                    errors={errors}
                    label={"نوع تصميم المبنى"}
                    placeholder={""}
                    name={"buildingDesign"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"رقم المبنى"}
                    placeholder={"47"}
                    name={"buildingNumber"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"رقم الشقة"}
                    placeholder={"02"}
                    name={"apartmentNumber"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />

                  <Input
                    errors={errors}
                    label={"المنطقة الجغرافية"}
                    placeholder={""}
                    name={"geoArea"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"كود التنظيم(العقاري)"}
                    placeholder={""}
                    name={"regulatoryCode"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"المشروع العقاري"}
                    placeholder={""}
                    name={"projectName"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />

                  <Input
                    errors={errors}
                    label={"رمز المجمع"}
                    placeholder={""}
                    name={"projectCode"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"اسم المجمع السكني"}
                    placeholder={""}
                    name={"projectHomeName"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                  <Input
                    errors={errors}
                    label={"نوع الوحدة العقارية"}
                    placeholder={""}
                    name={"unitType"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />

                  <Input
                    errors={errors}
                    label={"اسم المطور العقاري"}
                    placeholder={""}
                    name={"developerName"}
                    type={"text"}
                    register={register}
                    info={"hello"}
                  />
                </div>

                <div className="mr-1 m-auto flex justify-center items-center mb-4">
                  <NextButton title={"تم"} id={""} />
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
