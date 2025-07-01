import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { generalStepSchema, type GeneralStepType } from "@/data/website/schema/ListingFormSchema";
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

function GeneralStep({ form, setCurrentStep }: GeneralStepProps) {
  const general = useWatch({
    control: form.control,
    name: "general",
  });

  // State for each accordion section
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);

  // Toggle handlers for each accordion
  const toggleStateFirst = () => setIsOpenFirst((prev) => !prev);
  const toggleStateSecond = () => setIsOpenSecond((prev) => !prev);
  const toggleStateThird = () => setIsOpenThird((prev) => !prev);

  // City choices for the select dropdown
  const cityChoices = [
    { value: "damascus", label: "دمشق" },
    { value: "homs", label: "حمص" },
    { value: "aleppo", label: "حلب" },
    { value: "latakia", label: "اللاذقية" },
    { value: "daraa", label: "درعا" },
    { value: "hama", label: "حماة" },
    // Add more cities as needed
  ];

  // handle submit form
  const onSubmit = (data: GeneralStepType) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
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
                  {/* First Row */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center">
                        <Input
                          name="propertyId"
                          type="text"
                          label="رقم تعريف العقار"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline />
                      </div>
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="نعم"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="حمص"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* Second Row */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center">
                        <Input
                          name="propertyId"
                          type="text"
                          label="رقم تعريف العقار"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline />
                      </div>
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="نعم"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="حمص"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* third Row */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center">
                        <Input
                          name="propertyId"
                          type="text"
                          label="رقم تعريف العقار"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline />
                      </div>
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="نعم"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="حمص"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* Fourth Row */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center">
                        <Input
                          name="propertyId"
                          type="text"
                          label="رقم تعريف العقار"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline />
                      </div>
                    </div>
                    <div className="w-75">
                      <Select
                        label="المدينة"
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
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="حمص"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* Five Row */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center">
                        <Input
                          name="propertyId"
                          type="text"
                          label="رقم تعريف العقار"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline />
                      </div>
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="نعم"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="حمص"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* six Row */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center">
                        <Input
                          name="propertyId"
                          type="text"
                          label="رقم تعريف العقار"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline />
                      </div>
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="نعم"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                    <div className="w-75">
                      <Input
                        name="propertyId"
                        type="text"
                        label="رقم تعريف العقار"
                        placeholder="حمص"
                        errors={form.formState.errors}
                        addingInputStyle="mb-4 text-black"
                      />
                    </div>
                  </div>
                  {/* Seven Row */}
                  <div className="flex row mr-12 gap-35">
                    <div className="w-75">
                      <div className="flex items-center justify-center">
                        <Input
                          name="propertyId"
                          type="text"
                          label="رقم تعريف العقار"
                          placeholder=""
                          errors={form.formState.errors}
                          addingInputStyle="mb-4 text-black"
                        />
                        <IoIosInformationCircleOutline />
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
