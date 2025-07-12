import PageContainer from "@/components/global/pageContainer/PageContainer";
import NextButton from "@/components/global/form/button/NextButton";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import {
  roomInitailValues,
  type RoomsStepType,
} from "@/data/website/schema/ListingFormSchema";
import PreviouseButton from "@/components/global/form/button/PreviouseButton";
import FieldsArrayContainer, {
  FieldsArrayAddButton,
  FieldsArrayHeaderContainer,
  FieldsArrayRemoveButton,
  FieldsArrayRowCell,
  FieldsArrayRowContainer,
} from "@/components/global/form/fieldsArray/FieldsArray";
import Input from "@/components/global/form/input/Input";
import Select from "@/components/global/form/select/Select";
import { roomTypes } from "@/data/website/GeneralData";
interface RoomsStepProps {
  form: UseFormReturn<RoomsStepType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

// rooms step component
function RoomsStep({ form, setCurrentStep }: RoomsStepProps) {
  // extract form utils
  const { handleSubmit } = form;

  // rooms fields array
  const rooms = useFieldArray({
    name: "rooms",
    control: form.control,
    keyName: "id",
  });
  const controlledRooms = form.watch("rooms");

  // rooms table header titles
  const RoomsTitles = useMemo(
    () => [
      { name: "نوع الغرفة" },
      { name: "عرض الغرفة" },
      { name: "طول الغرفة" },
      { name: "", className: "!col-span-1" },
    ],
    []
  );

  const onSubmit = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <PageContainer className="flex-1 h-full overflow-auto">
      <form
        id="general_step_form"
        className="flex flex-col p-[48px] gap-[80px] h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* header */}
        <h3 className="text-primary-fg text-size40 font-bold w-full text-center">
          الغرف والمساحات
        </h3>

        {/* body container */}
        <div className="w-full flex flex-col flex-1 gap-[30px]">
          {/* fields table */}
          <FieldsArrayContainer>
            {/* header */}
            <FieldsArrayHeaderContainer titles={RoomsTitles} />

            {/* rows */}
            {controlledRooms?.map((_item, index) => {
              return (
                <FieldsArrayRowContainer key={rooms?.fields?.[index]?.id}>
                  {/* type */}
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

                  {/* width */}
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

                  {/* length */}
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

                  {/* actions */}
                  <FieldsArrayRowCell className="!col-span-1">
                    <FieldsArrayRemoveButton
                      remove={rooms.remove}
                      index={index}
                    />
                  </FieldsArrayRowCell>
                </FieldsArrayRowContainer>
              );
            })}

            {/* empty conten */}
            {!controlledRooms?.length ? (
              <div className="text-primary-fg bg-tertiary-bg rounded-b-[8px] font-medium text-size20 py-[16px] text-center">
                لم تتم إضافة أي غرفة
              </div>
            ) : null}
          </FieldsArrayContainer>

          {/* add row button */}
          <FieldsArrayAddButton
            append={rooms.append}
            initialValues={roomInitailValues}
          />
        </div>

        {/* buttons */}
        <div className="flex justify-between w-full gap-4 px-[107px]">
          <PreviouseButton setCurrentStep={setCurrentStep} />
          <NextButton id={"general_step_form"} />
        </div>
      </form>
    </PageContainer>
  );
}

export default RoomsStep;
