import { ConfirmationAlert } from "@/components/global/alert/Alert";
import Badge from "@/components/global/badge/Badge";
import Select from "@/components/global/form/select/Select";
import {
  PropertyStatus,
  STATUS_COLORS,
  STATUS_WITH_CLOSED,
} from "@/data/global/select";
import {
  statusFormInitialValues,
  statusFormSchema,
} from "@/data/website/schema/ListingFormSchema";
import { useCloseListings } from "@/hooks/website/listing/useCloseListing";
import { useEditListingsPartial } from "@/hooks/website/listing/useEditListingPartial";
import { useUser } from "@/stores/useUser";
import type { Listing } from "@/types/website/listings";
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";
import type { Row } from "@tanstack/react-table";
import { useState } from "react";
import { Form, useForm, useWatch } from "react-hook-form";
import { FaAngleDown } from "react-icons/fa6";

function StatusForm({ row }: { row: Row<Listing> }) {
  const { user } = useUser();

  const isSameUser =
    row?.original?.created_by_user?.user_id ==
    (user?.user_id ?? user?.data?.user_id);
  const isClosed = row?.original?.status == PropertyStatus.CLOSED;

  const { handleEditListingPartial } = useEditListingsPartial();
  const { handleCloseListing } = useCloseListings();

  const status = STATUS_WITH_CLOSED?.find(
    (ele) => ele?.value == row?.original?.status
  );

  // edit status form
  const form = useForm({
    resolver: joiResolver(statusFormSchema),
    defaultValues: cleanValues(statusFormInitialValues, { status: status }),
    mode: "onChange",
  });

  const value = useWatch({ control: form.control, name: "status" });

  const [open, setOpen] = useState(false);

  return (
    <>
      <Form {...form}>
        <form>
          <Select
            form={form}
            placeholder="اختر حالة العقار"
            choices={STATUS_WITH_CLOSED}
            keyValue="value"
            showValue="label"
            name="status"
            disabled={!isSameUser || isClosed}
            customTrigger={({ setIsOpen, isOpen }) => {
              return (
                <Badge
                  className={`w-full ${
                    isSameUser && !isClosed
                      ? "cursor-pointer"
                      : "cursor-default"
                  }`}
                  onClick={() => {
                    if (isSameUser && !isClosed) setIsOpen(true);
                  }}
                  status={
                    STATUS_WITH_CLOSED?.find(
                      (item) => item?.value == value?.value
                    )?.value as keyof typeof STATUS_COLORS
                  }
                  label={
                    <div className="flex items-center gap-xs">
                      <span>
                        {STATUS_WITH_CLOSED?.find(
                          (item) => item?.value == value?.value
                        )?.label ?? (value?.label as string)}
                      </span>
                      {isSameUser && !isClosed ? (
                        <div
                          className={`relative toggle-button ${
                            isOpen
                              ? "rotate-180 duration-[0.3s]"
                              : "duration-[0.3s]"
                          } transition-all`}
                        >
                          <FaAngleDown />
                        </div>
                      ) : null}
                    </div>
                  }
                />
              );
            }}
            onChange={(value) => {
              if (value?.value == PropertyStatus.CLOSED) {
                setOpen(true);
              } else {
                handleEditListingPartial(
                  { status: (value as { value: string })?.value },
                  row?.original?.property_id
                );
              }
            }}
            preventRemove
            required
          />
        </form>
      </Form>

      <ConfirmationAlert
        title="هل أنت متأكد من إغلاق عقد العقار؟"
        description="لن تتمكن من إجراء أي تعديل على العقار بعد ذلك"
        onCancel={() => {
          setOpen(false);
          form.setValue(
            "status",
            STATUS_WITH_CLOSED?.find(
              (ele) => ele?.value == row?.original?.status
            )
          );
        }}
        onContinue={() => {
          handleCloseListing(row?.original?.mls_num);
          setOpen(false);
        }}
        open={open}
      />
    </>
  );
}

export default StatusForm;
