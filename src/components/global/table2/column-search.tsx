import { Button } from "../form/button/Button";
import { Input } from "../ui/input";
import MultipleSelection from "@/components/global/ui/multiple-selection";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/global/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/global/ui/select";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import {
  parseAsArrayOf,
  parseAsIsoDate,
  parseAsString,
  useQueryState,
  type UseQueryStateOptions,
} from "nuqs";
import { type ChangeEventHandler, useState } from "react";
import { format } from "date-fns";

// Option type for select/multi-select
type Option = { label: string; value: string };

// Props for ColumnSearch
export type ColumnSearchProps = {
  id: string;
  title: string;
  searchKey: string;
  label: string;
  type: "text" | "number" | "select" | "multi-select" | "date";
  options?: Option[]; // for select and multi-select
  state: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  prefix?: string;
};

export default function ColumnSearch({
  title,
  searchKey,
  type,
  label,
  options = [],
  state,
  id,
  prefix = "",
}: ColumnSearchProps) {
  const [allowedFilters, setAllowedFilters] = state;
  const shouldShowFilter = allowedFilters.includes(id);

  const removeFilter = () => {
    setAllowedFilters((pre) => pre.filter((f) => f != id));
  };

  // Select the appropriate parser for the query state
  let parser: UseQueryStateOptions<any> = parseAsString.withDefault("");
  if (type === "multi-select") {
    parser = parseAsArrayOf(parseAsString).withDefault([]);
  } else if (type === "date") {
    parser = parseAsIsoDate;
  }

  // State for the query and the input value
  const [q, setQ] = useQueryState(`${prefix}_${searchKey}`, parser);
  const [inputValue, setInputValue] = useState(q || null);

  // Handlers for different input types
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (val: string) => {
    setInputValue(val);
  };

  const handleMultiSelectChange = (vals: string[]) => {
    setInputValue(vals);
  };

  const handleDateSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  // Apply the filter
  const handleSearch = () => {
    setQ(inputValue !== null ? inputValue : null);
  };

  // Clear the filter
  const handleClear = () => {
    setQ(null);
    setInputValue(null);
  };

  // Render the input node based on the type
  function renderInputNode() {
    switch (type) {
      case "text":
      case "number":
        return (
          <Input
            type={type}
            onChange={handleInputChange}
            value={(inputValue ?? "") as string}
            placeholder={label}
          />
        );
      case "select":
        return (
          <Select
            value={(inputValue ?? "") as string}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger currentValue={(inputValue ?? "") as string}>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "multi-select":
        return (
          <MultipleSelection
            triggerClassName="shadow-none rounded-xs border  !border-input-background"
            options={options}
            values={Array.isArray(inputValue) ? (inputValue as string[]) : []}
            onValuesChange={handleMultiSelectChange}
            loadingMessage={"جار التحميل..."}
            noResultsMessage={"لا يوجد نتائج"}
            placeholder={label}
          />
        );
      case "date":
        return (
          <Input type="date" value={inputValue} onChange={handleDateSelect} />
        );
      default:
        return null;
    }
  }

  // Render the current filter state as a string
  function renderStateLabel() {
    if (!q) return "";
    if (type === "date" && q instanceof Date) {
      return `: ${format(q, "PPP")}`;
    }
    if (type === "select") {
      const selected = options.find((opt) => opt.value === q);
      return selected ? `: ${selected.label}` : `: ${q}`;
    }
    if (type === "multi-select" && Array.isArray(q)) {
      const selectedLabels = q
        .map((val) => {
          const opt = options.find((o) => o.value === val);
          return opt ? opt.label : val;
        })
        .join(", ");
      return selectedLabels ? `: ${selectedLabels}` : "";
    }
    // text or number
    return `: ${q}`;
  }

  // Determine if there is a value set
  const hasValue = Array.isArray(q) ? q.length > 0 : Boolean(q);

  if (!shouldShowFilter) return null;
  return (
    <Popover>
      <PopoverTrigger className="group" asChild>
        <Button
          variant="table-filter"
          className={cn(
            "min-w-[100px] h-full px-[5px] py-[2px] bg-transparent text-primary font-normal cursor-pointer rounded-sm group relative border-2 border-primary",
            hasValue ? "bg-primary text-white" : ""
          )}
        >
          {title}
          {renderStateLabel()}

          {/* Show clear icon on hover if no value is set */}
          {!hasValue ? (
            <span
              onClick={removeFilter}
              className="absolute opacity-0 group-hover:opacity-100 transition top-0 right-0 translate-x-1/2 -translate-y-1/2 size-4 rounded-full border bg-red-500/80 flex items-center justify-center"
            >
              <X strokeWidth={1.3} className="size-3 text-white" />
            </span>
          ) : null}

          {/* Show clear button if value is set */}
          {hasValue ? (
            <span
              onClick={handleClear}
              className="border-s border-white h-full flex items-center ps-[5px] justify-center ms-2 cursor-pointer"
            >
              <X strokeWidth={1.3} className="size-4 text-white" />
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-sm bg-white shadow-sm border z-[40] ">
        <div className="flex gap-2 flex-col">
          {renderInputNode()}
          <Button onClick={handleSearch} className="w-full rounded-xs">
            {"إرسال"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
