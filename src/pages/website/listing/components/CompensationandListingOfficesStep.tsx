import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import Toggle from "@/components/global/form/toggle/Toggle";
import NextButton from "@/components/global/form/button/NextButton";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import type { CompensationAndListingOfficesStepType } from "@/data/website/schema/ListingFormSchema";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import { cityChoices } from "@/data/website/GeneralData";

interface CompensationAndListingOfficesStepProps {
  form: UseFormReturn<CompensationAndListingOfficesStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  handleSubmitForm: () => void;
}

function CompensationAndListingOfficesStep({
  form,
  setCurrentStep,
  handleSubmitForm,
}: CompensationAndListingOfficesStepProps) {
  const { handleSubmit } = form;

  const onSubmit = (data: CompensationAndListingOfficesStepType) => {
    handleSubmitForm();
    console.log(data);
  };

  return (
    <PageContainer className="h-full overflow-auto ">
      <form
        id="compensation_offices_form"
        className="mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSectionHeader textSize="text-size40">
          الوكيل المسؤول و التعويض
        </FormSectionHeader>
        <div className="p-[55px] pt-[10px] grid md:grid-cols-2 gap-x-[160px] gap-y-[24px]">
          <FormSectionHeader textSize="text-size32">التعويض</FormSectionHeader>
          <Input
            form={form}
            name="individualAgentCommission"
            label="عمولة الوكيل الفردي ($/%)"
            type="number"
            required
            info="أدخل نسبة أو مبلغ عمولة الوكيل الفردي"
          />
          <Input
            form={form}
            name="cooperativeBrokerCommission"
            label="عمولة السمسار المتعاون ($/%)"
            type="number"
            required
            info="أدخل نسبة أو مبلغ عمولة السمسار المتعاون"
          />
          <Input
            form={form}
            name="agentCommission"
            label="عمولة غير الممثل ($/%)"
            type="number"
            required
            info="أدخل نسبة أو مبلغ عمولة غير الممثل"
          />
          <Input
            form={form}
            name="commissionAmount"
            label="مبلغ المكافأة ($/%)"
            type="number"
            info="أدخل مبلغ المكافأة إن وجد"
          />
          <Select
            form={form}
            name="commissionDescription"
            label="وصف المكافأة"
            choices={cityChoices}
            showValue="label"
            keyValue="value"
            placeholder="اختر وصف المكافأة"
            info="اختر وصفًا مناسبًا للمكافأة"
          />
          <Input
            form={form}
            label="احتمال البيع المختصر (%/$)"
            name="ProbableShortSale"
            type="number"
            toggle="hasProbableShortSale"
            addingStyle="flex-1"
            info="يتم تعبئته تلقائيًا في حال البيع المختصر"
          />
          <Select
            form={form}
            name="internetSites"
            label="مواقع الانترنت"
            choices={cityChoices}
            showValue="label"
            keyValue="value"
            placeholder="اختر موقع الانترنت"
            info="حدد مواقع الإنترنت التي سيتم عرض العقار عليها"
          />

          <FormSectionHeader>الوكلاء</FormSectionHeader>
          <Select
            form={form}
            name="listingInstructions"
            label="تعليمات العرض"
            choices={cityChoices}
            showValue="label"
            keyValue="value"
            placeholder="اختر تعليمات العرض"
            info="حدد تعليمات العرض الخاصة بالعقار"
          />
          <Input
            form={form}
            name="listingDate"
            label="تاريخ الإدراج"
            type="date"
            info="حدد تاريخ إدراج العقار"
          />
          <Input
            form={form}
            name="expirationDate"
            label="تاريخ الانتهاء"
            type="date"
            info="حدد تاريخ انتهاء الإدراج"
          />

          <Input
            form={form}
            name="listingPhone"
            label="هاتف موعد العرض"
            type="text"
            info="أدخل رقم الهاتف لتحديد موعد العرض"
          />
          <Select
            form={form}
            name="TypeInsertion"
            label="نوع الإدراج"
            choices={cityChoices}
            showValue="label"
            keyValue="value"
            placeholder="اختر نوع الإدراج"
            info="حدد نوع الإدراج المناسب للعقار"
          />
          <div className="col-span-2 grid md:grid-cols-2 gap-y-[35px] mt-4">
            <Toggle
              label="هل تم الاتصال بالبائع لترتيب العرض؟"
              form={form}
              name="TheSellerBeingContactedToArrangeThePresentation"
            />
            <Toggle
              label="هل يوجد لافتة على العقار تحتوي على معلومات اتصال بالبائع؟"
              form={form}
              name="ThereASignOnThePropertyThatContainsContactInformationForTheSeller"
            />
            <Toggle
              label="هل سيقوم وسيط العقارات بأداء خدمات ما بعد العقد؟"
              form={form}
              name="WillTheRealEstateAgentProvidePostContractServices"
            />
            <Toggle
              label="هل سيكون وسيط العقارات متاحًا أثناء تقديم العقود والتفاوض؟"
              form={form}
              name="WillTheRealEstateAgentBeAvailableDuringTheContractSubmissionAndNegotiation"
            />
          </div>
          <FormSectionHeader textSize="text-size32">
            معلومات وكيل التسوية
          </FormSectionHeader>
          <Input
            form={form}
            name="marketingAgentName"
            label="اسم وكيل التسوية"
            type="text"
            info="أدخل اسم وكيل التسوية"
          />
          <Input
            form={form}
            name="marketingAgentTitle"
            label="عنوان وكيل التسوية"
            type="text"
            info="أدخل المسمى الوظيفي لوكيل التسوية"
          />
          <Input
            form={form}
            name="marketingAgentPhone"
            label="رقم هاتف وكيل التسوية"
            type="number"
            info="أدخل رقم هاتف وكيل التسوية"
          />
          <Input
            form={form}
            name="marketingAgentEmail"
            label="لبريد الإلكتروني لوكيل التسوية"
            type="text"
            info="أدخل البريد الإلكتروني لوكيل التسوية"
          />
          <FormSectionHeader textSize="text-size32">
            خيارات اضافية{" "}
          </FormSectionHeader>
          <div className="col-span-full flex justify-center">
            <Select
              form={form}
              keyValue="value"
              showValue="label"
              name={"additionalOptions"}
              choices={cityChoices}
              placeholder={"اختر مواصفات أخرى للرسوم المالية"}
              multiple={true}
              addingStyle="!w-[60%]"
              info="اختر خيارات إضافية متعلقة بالرسوم المالية"
            />
          </div>
          <div className="col-span-full flex justify-center">
            <Select
              form={form}
              keyValue="value"
              showValue="label"
              name={"additionalOptions"}
              placeholder={"اختر مواصفات أخرى للرسوم المالية"}
              multiple={true}
              choices={cityChoices}
              addingStyle="!w-[60%]"
              info="اختر خيارات إضافية متعلقة بالرسوم المالية"
            />
          </div>
        </div>

        <div className="flex justify-between w-full gap-4 px-[107px] mt-8">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton id="compensation_offices_form" />
        </div>
      </form>
    </PageContainer>
  );
}

export default CompensationAndListingOfficesStep;
