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
import { Form, useForm } from "react-hook-form";

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
          customTrigger={({ setIsOpen }) => {
            return (
              <Badge
                onClick={() => {
                  setIsOpen(true);
                }}
                status={
                  STATUS?.find((item) => item?.value == row?.original?.status)
                    ?.value as keyof typeof STATUS_COLORS
                }
                label={
                  STATUS?.find((item) => item?.value == row?.original?.status)
                    ?.label ?? row?.original?.status
                }
              />
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
