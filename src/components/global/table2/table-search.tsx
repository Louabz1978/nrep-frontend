import { useDebouncedCallback } from "@/hooks/global/use-debounced-callback";
import { cn } from "@/utils/cn";
import type { LucideIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React, { useState, type ReactNode } from "react"; // Import ReactNode
import type { IconType } from "react-icons/lib";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";

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
  hasSelect?: boolean;
  select?: ReactNode; // <-- CHANGED
}

const TableSearch = ({
  className,
  prefix = "",
  searchKey,
  searchPlaceholder,
  searchType,
  hasSelect,
  select,
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
    <>
      {hasSelect ? (
        select
      ) : (
        <Input
          placeholder={searchPlaceholder}
          type={searchType}
          variant="white"
          icon={FaSearch}
          iconClassName="text-gray-400/50 h-[18px] w-[18px] "
          iconInline
          {...props}
          value={value}
          onChange={handleChange}
          className={cn(
            "w-90 bg-white !h-2lg !text-size16 !border-gray-400 !rounded-[10px] placeholder:text-xs leading-tight py-sm px-md !text-sm ",
            className
          )}
        />
      )}
    </>
  );
};

export default TableSearch;
