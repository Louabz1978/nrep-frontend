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

// Define props interface for the RoomsStep component
interface RoomsStepProps {
  form: UseFormReturn<RoomsStepType>; // Form methods from react-hook-form
  setCurrentStep: Dispatch<SetStateAction<number>>; // Function to update current step
  handleSubmitForm: () => void; // handle submit all steps
}

// Main component for the Rooms step in a multi-step form
function RoomsStep({ form, setCurrentStep, handleSubmitForm }: RoomsStepProps) {
  // Extract form submission handler
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

  // Form submission handler - moves to next step
  const onSubmit = (data: RoomsStepType) => {
    setCurrentStep((prev) => prev + 1);
    handleSubmitForm?.();
    console.log(data);
  };

  return (
    <PageContainer className="flex-1 h-full overflow-auto">
      {/* Form container with submit handler */}
      <form
        id="general_step_form"
        className="flex flex-col p-[48px] gap-[80px] h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        {/* Navigation buttons */}
        <div className="flex justify-between w-full gap-4 px-[107px]">
          {/* Previous step button */}
          <PreviouseButton setCurrentStep={setCurrentStep} />
          {/* Next step button (submits the form) */}
          <NextButton id={"general_step_form"} />
        </div>
      </form>
    </PageContainer>
  );
}

export default RoomsStep;
