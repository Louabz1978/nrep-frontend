import type { ReactNode } from "react";
import { Button } from "../button/Button";
import { FaPlus, FaXmark } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../tooltip/Tooltiop";

interface FieldsArrayContainerProps {
  children: ReactNode;
  className?: string;
}
function FieldsArrayContainer({ children }: FieldsArrayContainerProps) {
  return (
    <div className="w-full flex flex-col min-w-[500px] border border-quaternary-border rounded-[8px]">
      {children}
    </div>
  );
}

export default FieldsArrayContainer;

interface FieldsArrayHeaderContainerProps {
  children?: ReactNode;
  className?: string;
  titles?: { name: string; className?: string }[];
}
export function FieldsArrayHeaderContainer({
  children,
  className = "",
  titles,
}: FieldsArrayHeaderContainerProps) {
  return (
    <div
      className={`grid grid-cols-7 bg-primary-bg border-b rounded-t-[8px] border-quaternary-border ${className}`}
    >
      {titles?.map((item, index) => {
        return (
          <FieldsArrayHeaderCell key={index} className={item?.className}>
            {item?.name}
          </FieldsArrayHeaderCell>
        );
      })}
      {children}
    </div>
  );
}

export function FieldsArrayHeaderCell({
  children,
  className = "",
}: FieldsArrayContainerProps) {
  return (
    <div
      className={`p-[16px] first:rounded-tr-[8px] last:rounded-tl-[8px] flex items-center justify-center text-[26px] text-primary-foreground font-bold border-e border-quaternary-border last:border-e-0 col-span-2 ${className}`}
    >
      {children}
    </div>
  );
}

export function FieldsArrayRowContainer({
  children,
  className = "",
}: FieldsArrayContainerProps) {
  return (
    <div
      className={`grid grid-cols-7 last:rounded-b-[8px] bg-tertiary-bg border-b border-quaternary-border last:border-b-0 ${className}`}
    >
      {children}
    </div>
  );
}

export function FieldsArrayRowCell({
  children,
  className = "",
}: FieldsArrayContainerProps) {
  return (
    <div
      className={`px-[16px] py-[7px] flex items-center justify-center text-[26px] text-primary-foreground font-bold border-e border-quaternary-border last:border-e-0 col-span-2 ${className}`}
    >
      {children}
    </div>
  );
}

interface FieldsArrayRemoveButtonProps {
  className?: string;
  remove: (id: number) => void;
  index: number;
}

export function FieldsArrayRemoveButton({
  className,
  remove,
  index,
}: FieldsArrayRemoveButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant={"semi-round"}
          size={"icon"}
          className={`bg-error ${className}`}
          onClick={(e) => {
            e.preventDefault();
            remove(index);
          }}
        >
          <FaXmark />
        </Button>
      </TooltipTrigger>
      <TooltipContent>حذف</TooltipContent>
    </Tooltip>
  );
}

interface FieldsArrayAddButtonProps<T> {
  className?: string;
  append: (row: T) => void;
  initialValues: T;
}
export function FieldsArrayAddButton<T>({
  className,
  append,
  initialValues,
}: FieldsArrayAddButtonProps<T>) {
  return (
    <Button
      variant={"outline"}
      className={`self-start px-[20px] ${className}`}
      onClick={(e) => {
        e.preventDefault();
        append(initialValues);
      }}
    >
      <span>إضافة</span>
      <FaPlus />
    </Button>
  );
}
