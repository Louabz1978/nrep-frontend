import Badge from "@/components/global/badge/Badge";
import Select from "@/components/global/form/select/Select";
import Input from "@/components/global/form/input/Input";
import { PropertyStatus, STATUS_WITH_CLOSED } from "@/data/global/select";
import {
  closingFormInitialValues,
  closingFormSchema,
} from "@/data/website/schema/ClosingFormSchema";
import {
  statusFormInitialValues,
  statusFormSchema,
} from "@/data/website/schema/ListingFormSchema";
import { useCloseListings } from "@/hooks/website/listing/useCloseListing";
import { useEditListingsPartial } from "@/hooks/website/listing/useEditListingPartial";
import { useUser } from "@/stores/useUser";
import type { Listing } from "@/types/website/listings";
import type { ClosingFormData } from "@/data/website/schema/ClosingFormSchema";
import cleanValues from "@/utils/cleanValues";
import { joiResolver } from "@hookform/resolvers/joi";
import type { Row } from "@tanstack/react-table";
import { useState } from "react";
import { Form, useForm, useWatch } from "react-hook-form";
import { FaAngleDown } from "react-icons/fa6";
import Popup from "@/components/global/popup/Popup";
import { Button } from "@/components/global/form/button/Button";
import useGetAllContacts from "@/hooks/website/Contact/useGetAllContacts";

function StatusForm({ row }: { row: Row<Listing> }) {
  const { user } = useUser();

  console.log(user);

  const isSameUser = row?.original?.created_by_user?.user_id == user?.user_id;
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

  const [open, setOpen] = useState<boolean>(false);
  const [initialStatusBeforeClosing, setInitialStatusBeforeClosing] = useState<{
    label: string;
    value: PropertyStatus;
  } | null>(null);

  const closingForm = useForm<ClosingFormData>({
    resolver: joiResolver(closingFormSchema),
    defaultValues: closingFormInitialValues,
    mode: "onChange",
  });

  const handleCloseFormSubmit = (data: ClosingFormData) => {
    handleCloseListing(row?.original?.mls_num, {
      ...data,
      buyer_agent: data.buyer_agent?.value || null,
    });
    setOpen(false);
    setInitialStatusBeforeClosing(null);
  };

  const { allContacts } = useGetAllContacts();

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
                    )?.value as PropertyStatus
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
            onChange={(newValue) => {
              const currentStatus = form.getValues("status");

              if (newValue?.value == PropertyStatus.CLOSED) {
                setInitialStatusBeforeClosing(
                  currentStatus
                    ? {
                        label: currentStatus.label as string,
                        value: currentStatus.value as PropertyStatus,
                      }
                    : null
                );
                // Temporarily revert the status in the form until the closing form is submitted or cancelled
                if (currentStatus) {
                  form.setValue("status", {
                    label: currentStatus.label,
                    value: currentStatus.value as string,
                  });
                }
                setOpen(true);
              } else {
                handleEditListingPartial(
                  { status: (newValue as { value: string })?.value },
                  row?.original?.property_id
                );
                setInitialStatusBeforeClosing(null);
              }
            }}
            preventRemove
            required
          />
        </form>
      </Form>

      {open && (
        <Popup
          open={open}
          onClose={() => {
            setOpen(false);
            if (initialStatusBeforeClosing) {
              form.setValue("status", initialStatusBeforeClosing);
            }
            setInitialStatusBeforeClosing(null);
          }}
        >
          <div className="flex flex-col gap-md p-md">
            <h3 className="text-lg font-semibold">إغلاق عقد العقار</h3>
            <Form {...closingForm}>
              <form
                id="closing_form"
                onSubmit={closingForm.handleSubmit(handleCloseFormSubmit)}
                className="flex flex-col gap-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <Select
                    form={closingForm}
                    name="buyer_agent"
                    label="وكيل المشتري"
                    placeholder="أدخل اسم وكيل المشتري"
                    choices={allContacts ?? []}
                    keyValue="consumer_id"
                    showValue="name"
                    required
                  />
                  <Input
                    form={closingForm}
                    name="buyer_agent_commission"
                    label="نسبة وكيل المشتري (%)"
                    placeholder="أدخل نسبة وكيل المشتري"
                    type="number"
                    required
                  />
                  <Input
                    form={closingForm}
                    name="seller_agent_commission"
                    label="نسبة وكيل البائع (%)"
                    placeholder="أدخل نسبة وكيل البائع"
                    type="number"
                    required
                  />
                  <Input
                    form={closingForm}
                    name="closing_date"
                    label="تاريخ الإغلاق"
                    placeholder="اختر تاريخ الإغلاق"
                    type="date"
                    required
                  />
                  <Input
                    form={closingForm}
                    name="closing_price"
                    label="سعر الإغلاق"
                    placeholder="أدخل سعر الإغلاق"
                    type="number"
                    required
                  />
                </div>
                <div className="flex justify-end gap-sm mt-md">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      if (initialStatusBeforeClosing) {
                        form.setValue("status", initialStatusBeforeClosing);
                      }
                      setInitialStatusBeforeClosing(null);
                    }}
                    className="cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <Button id="closing_form" type="submit">
                    حفظ
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Popup>
      )}
    </>
  );
}

export default StatusForm;
