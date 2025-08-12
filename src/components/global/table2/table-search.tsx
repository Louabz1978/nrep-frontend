import { useDebouncedCallback } from "@/hooks/global/use-debounced-callback";
import { cn } from "@/utils/cn";
import type { LucideIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React, { useState } from "react";
import type { IconType } from "react-icons/lib";
import { Input } from "../ui/input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon | IconType;
  variant?: "white" | "default";
  wrapperClassName?: string;
  hasError?: boolean;
  prefix: string;
  searchKey: string;
  searchPlaceholder: string;
  searchType: "text" | "number";
}

const TableSearch = ({
  className,
  prefix = "",
  searchKey,
  searchPlaceholder,
  searchType,
  ...props
}: InputProps) => {
  const [q, setQ] = useQueryState(
    `${prefix}_${searchKey}`,
    parseAsString.withDefault("")
  );
  const [value, setValue] = useState(q);

  const search = useDebouncedCallback(setQ, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    search(e.target.value);
  };

  return (
    <Input
      placeholder={searchPlaceholder}
      type={searchType}
      variant="white"
      {...props}
      value={value}
      onChange={handleChange}
      className={cn(
        "w-100 bg-white !h-2lg !text-size16 rounded-[8px] placeholder:text-xs leading-tight py-sm px-md !text-sm ",
        className
      )}
    />
  );
};

export default TableSearch;
