import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import Accrodion from "@/components/global/accrodion/Accrodion";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdRealEstateAgent } from "react-icons/md";
import { cityChoices, yesNo } from "@/data/website/GeneralData";
import type { GeneralStepType } from "@/data/website/schema/ListingFormSchema";

interface GeneralStepProps {
  form: UseFormReturn<GeneralStepType, any, GeneralStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

function GeneralStep({ form, setCurrentStep }: GeneralStepProps) {
  // extract form utils
  const { handleSubmit } = form;

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
                <div className="ps-[39px] pe-[71px] pb-[30px] grid lg:grid-cols-3 md:grid-cols-2 gap-x-[72px] gap-y-[56px]">
                  <Input
                    form={form}
                    label={"رقم تعريف العقار"}
                    placeholder={""}
                    name={"propertyId"}
                    type={"number"}
                    info={"hello"}
                  />
                  <Select
                    form={form}
                    label={"إخفاء رقم العقار"}
                    choices={yesNo}
                    showValue="label"
                    keyValue="value"
                    name={"hiddenPropertyId"}
                    placeholder={"نعم"}
                    info={"hello"}
                  />
                  <Select
                    form={form}
                    label={"المدينة"}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    name={"city"}
                    placeholder={"اختر المدينة"}
                    info={"hello"}
                  />

                  <Input
                    form={form}
                    label={"اسم الشارع"}
                    placeholder={"شارع الدبلان"}
                    name={"streetName"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"رقم الشارع"}
                    placeholder={"1234"}
                    name={"streetNumber"}
                    info={"hello"}
                  />
                  <Select
                    form={form}
                    label={"نوع الشارع"}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    name={"streetType"}
                    placeholder={"طريق عام"}
                    info={"hello"}
                  />

                  <Select
                    form={form}
                    label={"الاتجاه الجغرافي السابق"}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    name={"previousGeoDirection"}
                    placeholder={"شمال"}
                    info={"hello"}
                  />
                  <Select
                    form={form}
                    label={"الاتجاه الجغرافي اللاحق"}
                    choices={cityChoices}
                    showValue="label"
                    keyValue="value"
                    name={"nextGeoDirection"}
                    placeholder={"شمال"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"الرمز البريدي"}
                    placeholder={"33914"}
                    name={"postalCode"}
                    info={"hello"}
                  />

                  <Input
                    form={form}
                    label={"نوع تصميم المبنى"}
                    placeholder={""}
                    name={"buildingDesign"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"رقم المبنى"}
                    placeholder={"47"}
                    name={"buildingNumber"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"رقم الشقة"}
                    placeholder={"02"}
                    name={"apartmentNumber"}
                    info={"hello"}
                  />

                  <Input
                    form={form}
                    label={"المنطقة الجغرافية"}
                    placeholder={""}
                    name={"geoArea"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"كود التنظيم(العقاري)"}
                    placeholder={""}
                    name={"regulatoryCode"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"المشروع العقاري"}
                    placeholder={""}
                    name={"projectName"}
                    info={"hello"}
                  />

                  <Input
                    form={form}
                    label={"رمز المجمع"}
                    placeholder={""}
                    name={"projectCode"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"اسم المجمع السكني"}
                    placeholder={""}
                    name={"projectHomeName"}
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    label={"نوع الوحدة العقارية"}
                    placeholder={""}
                    name={"unitType"}
                    info={"hello"}
                  />

                  <Input
                    form={form}
                    label={"اسم المطور العقاري"}
                    placeholder={""}
                    name={"developerName"}
                    info={"hello"}
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
                <div className="ps-[39px] pe-[71px] pb-[30px] grid lg:grid-cols-3 md:grid-cols-2 gap-x-[72px] gap-y-[56px]">
                  <Input
                    form={form}
                    name="propertyStatus"
                    label="حالة العقار"
                    labelStyle="font-bold"
                    placeholder="معروض للبيع"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="offeredPrice"
                    type="number"
                    label="السعر المعروض"
                    labelStyle="font-bold"
                    placeholder="1,000,000 ل.س"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="yearBuilt"
                    type="number"
                    label="سنة البناء"
                    labelStyle="font-bold"
                    placeholder="2010"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="totalArea"
                    type="number"
                    label="المساحة الإجمالية التقريبية"
                    labelStyle="font-bold"
                    placeholder=""
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="livingArea"
                    type="number"
                    label="المساحة التقريبية للمعيشة"
                    labelStyle="font-bold"
                    placeholder=""
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="furnished"
                    label="مفروشة"
                    labelStyle="font-bold"
                    placeholder="غير مفروشة"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="bedrooms"
                    type="number"
                    label="عدد غرف النوم"
                    labelStyle="font-bold"
                    placeholder="3"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="bathroomsWithShower"
                    type="number"
                    label="عدد دورات المياه (مع دش)"
                    labelStyle="font-bold"
                    placeholder="2"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="bathroomsWithoutShower"
                    type="number"
                    label="عدد دورات المياه (بدون دش)"
                    labelStyle="font-bold"
                    placeholder="1"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="ceilingFans"
                    type="number"
                    label="عدد مراوح السقف"
                    labelStyle="font-bold"
                    placeholder="0"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="elevator"
                    label="مصعد"
                    labelStyle="font-bold"
                    placeholder="لا يوجد"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="garageSpaces"
                    type="number"
                    label="عدد مواقف الكراج"
                    labelStyle="font-bold"
                    placeholder="1"
                    info={"hello"}
                  />
                  <Input
                    form={form}
                    name="cableAvailable"
                    label="الكابل متوفر (التلفزيون/الإنترنت)"
                    labelStyle="font-bold"
                    placeholder="لا يوجد"
                    info={"hello"}
                  />
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
