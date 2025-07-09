import Select from "@/components/global/form/select/Select";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import type { SetStateAction } from "jotai";
import { type Dispatch } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  APPROVALINFO,
  BEDROOMDETAILES,
  FACILITIES,
  GUESTROOM,
  JACCUZI,
  PORTINFO,
  PRIVATEPOOL,
  SAFTEY,
  STORMPROTECTION,
  TERMS,
  VIEW,
} from "@/data/global/select";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import type { FeaturesStepType } from "@/data/website/schema/ListingFormSchema";

interface FeaturesStepProps {
  // form: UseFormReturn<any>;
  form: UseFormReturn<FeaturesStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  handleSubmitForm: () => void;
}

function FeaturesStep({
  form,
  setCurrentStep,
  handleSubmitForm,
}: FeaturesStepProps) {
  // extract form utils
  const { handleSubmit } = form;

  // handle submit form
  const onSubmit = () => {
    setCurrentStep((prev) => prev + 1);
    handleSubmitForm?.();
  };

  return (
    <PageContainer className="h-full overflow-auto ">
      <form
        id="features_step_form"
        className="mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-[40px] pt-[24px] grid md:grid-cols-2 gap-x-[160px] gap-y-[24px]">
          <FormSectionHeader>المميزات</FormSectionHeader>
          <Select
            form={form}
            label={"غرف إضافية"}
            keyValue="value"
            showValue="label"
            choices={GUESTROOM}
            name={"guestRoom"}
            placeholder={"اختر وجود غرفة ضيوف"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"الأمان"}
            keyValue="value"
            showValue="label"
            choices={SAFTEY}
            name={"safty"}
            placeholder={"مؤمن بالكامل"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"الخدمات و المرافق"}
            keyValue="value"
            showValue="label"
            choices={FACILITIES}
            name={"facilities"}
            placeholder={"ملعب كرة قدم"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"تفاصيل غرف النوم"}
            keyValue="value"
            showValue="label"
            choices={BEDROOMDETAILES}
            name={"bedroomDetailes"}
            placeholder={"غرف نوم موزعة"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"معلومات الموافقة"}
            keyValue="value"
            showValue="label"
            choices={APPROVALINFO}
            name={"approvalInfo"}
            placeholder={"موافقة المشتري"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"الأطلالة"}
            keyValue="value"
            showValue="label"
            choices={VIEW}
            name={"view"}
            placeholder={"إختر الإطلالة"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"معلومات الميناء/القارب"}
            keyValue="value"
            showValue="label"
            choices={PORTINFO}
            name={"portInfo"}
            placeholder={"إختر معلومات الميناء"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"الحماية من العواصف"}
            keyValue="value"
            showValue="label"
            choices={STORMPROTECTION}
            name={"stormProtiction"}
            placeholder={"إختر طريقة الحماية من العواصف"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"مسبح خاص"}
            toggle={"hasPrivatePool"}
            keyValue="value"
            showValue="label"
            choices={PRIVATEPOOL}
            name={"privatePool"}
            placeholder={"مسبح أرضي"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"جاكوزي"}
            toggle={"hasJaccuzi"}
            keyValue="value"
            showValue="label"
            choices={JACCUZI}
            name={"jaccuzi"}
            placeholder={"مسبح أرضي"}
            multiple={true}
            info={"hello"}
          />
          <Select
            form={form}
            label={"الشروط"}
            keyValue="value"
            showValue="label"
            choices={TERMS}
            name={"terms"}
            placeholder={"إختر الشروط"}
            multiple={true}
            info={"hello"}
          />
        </div>
        {/* Next Button */}
        <div className="flex justify-between w-full gap-4 px-[107px]">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton id={"general_step_form"} />
        </div>
      </form>
    </PageContainer>
  );
}

export default FeaturesStep;
