import Select from "@/components/global/form/select/Select";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  APPROVALINFO,
  BEDROOMDETAILES,
  FACILITIES,
  GUESTROOM,
  JACCUZI,
  PRIVATEPOOL,
  SAFTEY,
} from "@/data/global/select";

interface FeaturesStepProps {
  form: UseFormReturn<any>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

function FeaturesStep({ form, setCurrentStep }: FeaturesStepProps) {
  // extract form utils
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
  } = form;

  // handle submit form
  const onSubmit = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <PageContainer className="h-full overflow-auto">
      <form id="features_step_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row bg-[#FDF9EF]">
          <div className="min-h-100 flex w-full">
            <div className="rounded-lg text-black w-full mt-3">
              {/* Header */}
              <h2 className="text-4xl mr-7 mt-5 font-extrabold mb-5 text-right">
                الميزات الإضافية :
              </h2>
              {/*paragraph*/}
              <div className="text-right max-w-5xl mr-12 text-base text-[#1C2026] mb-8">
                <p className="text-2xl mb-4">
                  يرجى اختيار الميزات الإضافية المتوفرة في العقار الخاص بك.
                </p>
              </div>
              {/* Selects */}
              <div className="px-10 grid lg:grid-cols-3 md:grid-cols-2 gap-x-[72px] gap-y-[40px]">
                <Select
                  label={"غرف إضافية"}
                  trigger={trigger}
                  setValue={setValue}
                  watch={watch}
                  keyValue="value"
                  showValue="label"
                  choices={GUESTROOM}
                  register={register}
                  errors={errors}
                  name={"guestRoom"}
                  placeholder={"اختر وجود غرفة ضيوف"}
                  multiple={true}
                />
                <Select
                  label={"الأمان"}
                  trigger={trigger}
                  setValue={setValue}
                  watch={watch}
                  keyValue="value"
                  showValue="label"
                  choices={SAFTEY}
                  register={register}
                  errors={errors}
                  name={"safty"}
                  placeholder={"مؤمن بالكامل"}
                  multiple={true}
                />
                <Select
                  label={"مسبح خاص"}
                  trigger={trigger}
                  setValue={setValue}
                  watch={watch}
                  keyValue="value"
                  showValue="label"
                  choices={PRIVATEPOOL}
                  register={register}
                  errors={errors}
                  name={"privatePool"}
                  placeholder={"مسبح أرضي"}
                  multiple={true}
                />
                <Select
                  label={"جاكوزي"}
                  trigger={trigger}
                  setValue={setValue}
                  watch={watch}
                  keyValue="value"
                  showValue="label"
                  choices={JACCUZI}
                  register={register}
                  errors={errors}
                  name={"jaccuzi"}
                  placeholder={"مسبح أرضي"}
                  multiple={true}
                />
                <Select
                  label={"الخدمات و المرافق"}
                  trigger={trigger}
                  setValue={setValue}
                  watch={watch}
                  keyValue="value"
                  showValue="label"
                  choices={FACILITIES}
                  register={register}
                  errors={errors}
                  name={"facilities"}
                  placeholder={"ملعب كرة قدم"}
                  multiple={true}
                />
                <Select
                  label={"تفاصيل غرف النوم"}
                  trigger={trigger}
                  setValue={setValue}
                  watch={watch}
                  keyValue="value"
                  showValue="label"
                  choices={BEDROOMDETAILES}
                  register={register}
                  errors={errors}
                  name={"bedroomDetailes"}
                  placeholder={"غرف نوم موزعة"}
                  multiple={true}
                />
                <Select
                  label={"معلومات الموافقة"}
                  trigger={trigger}
                  setValue={setValue}
                  watch={watch}
                  keyValue="value"
                  showValue="label"
                  choices={APPROVALINFO}
                  register={register}
                  errors={errors}
                  name={"approvalInfo"}
                  placeholder={"موافقة المشتري"}
                  multiple={true}
                />
              </div>
              {/* Next Button */}
              <div className="flex justify-center w-full gap-4 mt-3">
                <NextButton title="التالي" id="features_step_form" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}

export default FeaturesStep;
