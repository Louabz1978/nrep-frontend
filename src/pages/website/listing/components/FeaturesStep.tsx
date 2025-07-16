import Select from "@/components/global/form/select/Select";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import type { SetStateAction } from "jotai";
import { useMemo, type Dispatch } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
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
import {
  roomInitailValues,
  type FeaturesStepType,
} from "@/data/website/schema/ListingFormSchema";
import FieldsArrayContainer, {
  FieldsArrayAddButton,
  FieldsArrayHeaderContainer,
  FieldsArrayRemoveButton,
  FieldsArrayRowCell,
  FieldsArrayRowContainer,
} from "@/components/global/form/fieldsArray/FieldsArray";
import Input from "@/components/global/form/input/Input";
import { roomTypes } from "@/data/website/GeneralData";

interface FeaturesStepProps {
  // form: UseFormReturn<any>;
  form: UseFormReturn<FeaturesStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

function FeaturesStep({ form, setCurrentStep }: FeaturesStepProps) {
  // extract form utils
  const { handleSubmit } = form;

  // Initialize field array for dynamic rooms management
  const rooms = useFieldArray({
    name: "rooms", // Name of the field array in the form
    control: form.control, // Form control from react-hook-form
    keyName: "id", // Custom key name for array items
  });

  // Watch all rooms fields to keep UI in sync
  const controlledRooms = form.watch("rooms");

  // Memoized table header titles to prevent unnecessary re-renders
  const RoomsTitles = useMemo(
    () => [
      { name: "نوع الغرفة" },
      { name: "عرض الغرفة" },
      { name: "طول الغرفة" },
      { name: "", className: "!col-span-1" }, // Empty header for actions column
    ],
    []
  );

  // handle submit form
  const onSubmit = (data: FeaturesStepType) => {
    setCurrentStep((prev) => prev + 1);
    console.log(data);
  };

  return (
    <PageContainer className="h-full overflow-auto ">
      <form
        id="features_step_form"
        className="mb-10 flex flex-col gap-[80px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-[40px] pt-[24px] grid md:grid-cols-2 gap-x-[160px] gap-y-[24px]">
          <FormSectionHeader>الميزات والغرف</FormSectionHeader>

          <FormSectionHeader>الميزات</FormSectionHeader>
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
          />
        </div>

        <div className="flex flex-col gap-[80px] px-[130px]">
          {/* Form header */}
          <h3 className="text-primary-fg text-size40 font-bold w-full text-center">
            الغرف والمساحات
          </h3>

          {/* Main content container */}
          <div className="w-full flex flex-col flex-1 gap-[30px]">
            {/* Fields array table container */}
            <FieldsArrayContainer>
              {/* Table header row */}
              <FieldsArrayHeaderContainer titles={RoomsTitles} />

              {/* Dynamic rows for each room */}
              {controlledRooms?.map((_item, index) => {
                return (
                  <FieldsArrayRowContainer key={rooms?.fields?.[index]?.id}>
                    {/* Room type select field */}
                    <FieldsArrayRowCell>
                      <Select
                        form={form}
                        placeholder="ادخل نوع الغرفة"
                        name={`rooms.${index}.type`}
                        keyValue="value"
                        showValue="label"
                        info="ادخل نوع الغرفة"
                        choices={roomTypes}
                        required
                      />
                    </FieldsArrayRowCell>

                    {/* Room width input field */}
                    <FieldsArrayRowCell>
                      <Input
                        form={form}
                        type="number"
                        placeholder="ادخل عرض الغرفة"
                        name={`rooms.${index}.width`}
                        info="ادخل عرض الغرفة"
                        required
                      />
                    </FieldsArrayRowCell>

                    {/* Room length input field */}
                    <FieldsArrayRowCell>
                      <Input
                        form={form}
                        type="number"
                        placeholder="ادخل طول الغرفة"
                        name={`rooms.${index}.length`}
                        info="ادخل طول الغرفة"
                        required
                      />
                    </FieldsArrayRowCell>

                    {/* Remove button for this row */}
                    <FieldsArrayRowCell className="!col-span-1">
                      <FieldsArrayRemoveButton
                        remove={rooms.remove} // Remove function from useFieldArray
                        index={index} // Current row index
                      />
                    </FieldsArrayRowCell>
                  </FieldsArrayRowContainer>
                );
              })}

              {/* Empty state message when no rooms added */}
              {!controlledRooms?.length ? (
                <div className="text-primary-fg bg-tertiary-bg rounded-b-[8px] font-medium text-size20 py-[16px] text-center">
                  لم تتم إضافة أي غرفة
                </div>
              ) : null}
            </FieldsArrayContainer>

            {/* Button to add new room row */}
            <FieldsArrayAddButton
              append={rooms.append} // Append function from useFieldArray
              initialValues={roomInitailValues} // Default values for new room
            />
          </div>
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
