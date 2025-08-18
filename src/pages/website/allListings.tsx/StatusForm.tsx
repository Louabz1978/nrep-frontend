import Badge from "@/components/global/badge/Badge";
import Select from "@/components/global/form/select/Select";
import { STATUS, STATUS_COLORS } from "@/data/global/select";
import {
  statusFormInitialValues,
  statusFormSchema,
} from "@/data/website/schema/ListingFormSchema";
import { useEditListingsPartial } from "@/hooks/website/listing/useEditListingPartial";
import type { Listing } from "@/types/website/listings";
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";
import type { Row } from "@tanstack/react-table";
import { Form, useForm, useWatch } from "react-hook-form";
import { FaAngleDown } from "react-icons/fa6";

function StatusForm({ row }: { row: Row<Listing> }) {
  const { editListingPartial, handleEditListingPartial } =
    useEditListingsPartial();

  const status = STATUS?.find((ele) => ele?.value == row?.original?.status);

  // edit status form
  const form = useForm({
    resolver: joiResolver(statusFormSchema),
    defaultValues: cleanValues(statusFormInitialValues, { status: status }),
    mode: "onChange",
  });

  const value = useWatch({ control: form.control, name: "status" });

  return (
    <Form {...form}>
      <form>
        <Select
          form={form}
          placeholder="اختر حالة العقار"
          choices={STATUS}
          keyValue="value"
          showValue="label"
          name="status"
          customTrigger={({ setIsOpen, isOpen }) => {
            return (
              <Badge
                className="w-full cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                }}
                status={
                  STATUS?.find((item) => item?.value == value?.value)
                    ?.value as keyof typeof STATUS_COLORS
                }
                label={
                  <div className="flex items-center gap-xs">
                    <span>
                      {STATUS?.find((item) => item?.value == value?.value)
                        ?.label ?? (value?.label as string)}
                    </span>
                    <div
                      className={`relative toggle-button ${
                        isOpen
                          ? "rotate-180 duration-[0.3s]"
                          : "duration-[0.3s]"
                      } transition-all`}
                    >
                      <FaAngleDown />
                    </div>
                  </div>
                }
              />
            );
          }}
          onChange={(value) => {
            console.log("rnder");
            handleEditListingPartial(
              { status: (value as { value: string })?.value },
              row?.original?.property_id
            );
          }}
          preventRemove
          required
        />
      </form>
    </Form>
  );
}

export default StatusForm;
