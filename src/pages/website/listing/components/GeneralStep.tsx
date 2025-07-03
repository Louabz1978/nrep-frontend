import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import Accrodion from "@/components/global/accrodion/Accrodion";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdRealEstateAgent } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";

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
                  {/* Row 1 */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center relative">
                        <Input
                          name="propertyId"
                          type="text"
                          label="رقم تعريف العقار"
                          labelStyle="font-bold"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline className="absolute left-[-20px] top-[43px]" />
                      </div>
                    </div>
                    <div className="w-75">
                      <Select
                        label="إخفاء رقم العقار"
                        labelStyle="font-bold"
                        name="hiddenPropertyId"
                        placeholder="نعم"
                        choices={cityChoices}
                        setValue={form.setValue}
                        trigger={form.trigger}
                        watch={form.watch}
                        errors={form.formState.errors}
                        showValue="label"
                        keyValue="value"
                      />
                    </div>
                    <div className="w-75">
                      <Select
                        label="المدينة"
                        labelStyle="font-bold"
                        name="city"
                        placeholder="اختر المدينة"
                        choices={cityChoices}
                        setValue={form.setValue}
                        trigger={form.trigger}
                        watch={form.watch}
                        errors={form.formState.errors}
                        showValue="label"
                        keyValue="value"
                      />
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center relative">
                        <Input
                          name="streetName"
                          type="text"
                          label="اسم الشارع"
                          labelStyle="font-bold"
                          placeholder="شارع الدبلان"
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline className="absolute left-[-20px] top-[43px]" />
                      </div>
                    </div>
                    <div className="w-75">
                      <Input
                        name="streetNumber"
                        type="text"
                        label="رقم الشارع"
                        labelStyle="font-bold"
                        placeholder="1234"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                    <div className="w-75">
                      <Select
                        label="نوع الشارع"
                        labelStyle="font-bold"
                        name="streetType"
                        placeholder="طريق عام"
                        choices={cityChoices}
                        setValue={form.setValue}
                        trigger={form.trigger}
                        watch={form.watch}
                        errors={form.formState.errors}
                        showValue="label"
                        keyValue="value"
                      />
                    </div>
                  </div>
                  {/* Row 3 */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <Select
                        label="الاتجاه الجغرافي السابق"
                        labelStyle="font-bold"
                        name="previousGeoDirection"
                        placeholder="شمال"
                        choices={cityChoices}
                        setValue={form.setValue}
                        trigger={form.trigger}
                        watch={form.watch}
                        errors={form.formState.errors}
                        showValue="label"
                        keyValue="value"
                      />
                    </div>
                    <div className="w-75">
                      <Select
                        label="الاتجاه الجغرافي اللاحق"
                        labelStyle="font-bold"
                        name="nextGeoDirection"
                        placeholder="شمال"
                        choices={cityChoices}
                        setValue={form.setValue}
                        trigger={form.trigger}
                        watch={form.watch}
                        errors={form.formState.errors}
                        showValue="label"
                        keyValue="value"
                      />
                    </div>
                    <div className="w-75">
                      <Input
                        name="postalCode"
                        type="text"
                        label="الرمز البريدي"
                        labelStyle="font-bold"
                        placeholder="33914"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* Row 4 */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center relative">
                        <Input
                          name="buildingDesign"
                          type="text"
                          label="نوع تصميم المبنى"
                          labelStyle="font-bold"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline className="absolute left-[-20px] top-[43px]" />
                      </div>
                    </div>
                    <div className="w-75">
                      <Input
                        name="buildingNumber"
                        type="text"
                        label="رقم المبنى"
                        labelStyle="font-bold"
                        placeholder="47"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                    <div className="w-75">
                      <Input
                        name="apartmentNumber"
                        type="text"
                        label="رقم الشقة"
                        labelStyle="font-bold"
                        placeholder="02"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* Row 5 */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center relative">
                        <Input
                          name="geoArea"
                          type="text"
                          label="المنطقة الجغرافية"
                          labelStyle="font-bold"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline className="absolute left-[-20px] top-[43px]" />
                      </div>
                    </div>
                    <div className="w-75">
                      <Input
                        name="regulatoryCode"
                        type="text"
                        label="كود التنظيم(العقاري)"
                        labelStyle="font-bold"
                        placeholder=""
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                    <div className="w-75">
                      <Input
                        name="projectName"
                        type="text"
                        label="المشروع العقاري"
                        labelStyle="font-bold"
                        placeholder=""
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* Row 6 */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center relative">
                        <Input
                          name="projectCode"
                          type="text"
                          label="رمز المجمع"
                          labelStyle="font-bold"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline className="absolute left-[-20px] top-[43px]" />
                      </div>
                    </div>
                    <div className="w-75">
                      <Input
                        name="projectName"
                        type="text"
                        label="اسم المجمع السكني"
                        labelStyle="font-bold"
                        placeholder=""
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                    <div className="w-75">
                      <Input
                        name="unitType"
                        type="text"
                        label="نوع الوحدة العقارية"
                        labelStyle="font-bold"
                        placeholder=""
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* Row 7 */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center relative">
                        <Input
                          name="developerName"
                          type="text"
                          label="اسم المطور العقاري"
                          labelStyle="font-bold"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline className="absolute left-[-20px] top-[43px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </Accrodion>

              {/* Accordion for property category */}
              <Accrodion
                onClick={toggleStateSecond}
                title="فئة العقار : سكني"
                icon={<HiOutlineBuildingOffice2 />}
                isOpen={isOpenSecond}
              >
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
