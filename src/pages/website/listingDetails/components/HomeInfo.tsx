import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons/lib";

interface HomeInfo {
  icon?: IconType | LucideIcon;
  label: string;
  value?: ReactNode;
  valueClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
}
function HomeInfo({
  icon: Icon,
  label,
  value,
  valueClassName,
  iconClassName,
  labelClassName,
}: HomeInfo) {
  return (
    <div className="h-full flex items-center gap-md justify-between">
      {/* icon */}
      <div className="flex items-center gap-md">
        {Icon ? (
          <Icon
            className={`size-2xl min-w-2xl text-secondary-fg ${iconClassName}`}
          />
        ) : null}

        {/* label */}
        <div
          className={`text-size18 font-black text-tertiary-fg ${labelClassName}`}
        >
          {label}
        </div>
      </div>

      {/* value */}
      <div className={`text-size18 text-tertiary-fg ${valueClassName}`}>
        {value === undefined || value === null || value === "" ? "---" : value}
      </div>
    </div>
  );
}

export default HomeInfo;
