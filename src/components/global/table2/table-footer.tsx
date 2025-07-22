import { Button } from "../form/button/Button";
import { useModal } from "@/hooks/global/use-modal";
import { type UseMutationResult } from "@tanstack/react-query";
import { type Row } from "@tanstack/react-table";
import { type Dispatch, type SetStateAction } from "react";

interface TableFooterProps<T> {
  selectedRows: Row<T & { id: string }>[];
  deleteMutation: UseMutationResult<any, any, any, any>;
  handleDelete: (props: any, p: any) => Promise<void>;
  setSelectedRows: Dispatch<SetStateAction<Row<T & { id: string }>[]>>;
  idsKey: string;
  editModalKey: string;
}
function TableFooter<T>({
  selectedRows,
  // deleteMutation,
  handleDelete,
  setSelectedRows,
  idsKey,
  editModalKey,
}: TableFooterProps<T>) {
  // translations

  // modal control
  const { openModal } = useModal();

  return selectedRows?.length ? (
    <div className="px-[24px]">
      <div className="py-[8px] px-[12px] bg-card border border-border rounded-[5px] flex items-center gap-[8px]">
        {/* edit */}
        {selectedRows?.length == 1 ? (
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              openModal(`${editModalKey}${selectedRows?.[0]?.original?.id}`);
            }}
          >
            {"تعديل"}
          </Button>
        ) : null}

        {/* delete */}
        <Button
          variant={"destructive"}
          // loading={deleteMutation?.isPending}
          onClick={() => {
            const ids = selectedRows?.map((item) => item?.original?.id);
            handleDelete(
              {
                [idsKey]: ids,
              },
              () => {
                selectedRows?.map((item) => {
                  if (ids.includes(item?.original?.id)) {
                    item?.toggleSelected();
                  }
                });
                setSelectedRows(
                  (prev) =>
                    prev?.filter((item) => !ids.includes(item?.original?.id))
                );
              }
            ).catch(console.error);
          }}
        >
          {"حذف"}
        </Button>
      </div>
    </div>
  ) : null;
}

export default TableFooter;
