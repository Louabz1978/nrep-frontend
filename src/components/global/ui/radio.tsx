import * as React from "react";
import { cn } from "@/utils/cn";

type RadioProps = {
  name: string;
  value: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  ariaLabel?: string;
  className?: string;
  labelClassName?: string;
};

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ name, value, label, checked, onChange, ariaLabel, className, labelClassName }, ref) => {
    return (
      <label
        className={cn(
          "flex items-center gap-2 sm:gap-4  cursor-pointer select-none",
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          className="sr-only peer "
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          aria-label={ariaLabel ?? String(label)}
        />
        <span className="relative grid place-items-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-tertiary-bg shadow-md after:content-[''] after:w-3 after:h-3 sm:after:w-3.5 sm:after:h-3.5 after:rounded-full after:bg-primary after:transition-transform after:duration-150 after:ease-out after:scale-0 peer-checked:after:scale-100" />
        <span className={cn("text-primary", labelClassName || "text-base sm:text-xl")}>{label}</span>
      </label>
    );
  }
);
Radio.displayName = "Radio";

export { Radio };
