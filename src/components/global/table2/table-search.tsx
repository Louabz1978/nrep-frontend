"use client";

import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import React, { useState } from "react";
import type { IconType } from "react-icons/lib";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon | IconType;
  variant?: "white" | "default";
  wrapperclassname?: string;
  hasError?: boolean;
  prefix: string;
}

const TableSearch = ({ className, prefix = "", ...props }: InputProps) => {
  const t = useTranslations();
  const [q, setQ] = useQueryState(
    `${prefix}_search`,
    parseAsString.withDefault("")
  );
  const [value, setValue] = useState(q);

  const search = useDebouncedCallback(setQ, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    search("hello world");
  };

  return (
    <Input
      // placeholder={t("table.search-input.placeholder")}
      placeholder={"table.search-input.placeholder"}
      variant="white"
      {...props}
      value={value}
      onChange={handleChange}
      className={cn(
        "max-w-[250px]  placeholder:text-xs leading-tight py-1  h-8 px-2 !text-sm ",
        className
      )}
    />
  );
};

export default TableSearch;
