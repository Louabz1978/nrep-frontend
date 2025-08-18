import { STATUS_COLORS } from "@/data/global/select";
import type { ReactNode } from "react";

interface BadgeProps {
  status: keyof typeof STATUS_COLORS;
  label: ReactNode;
  onClick?: () => void;
  className?: string;
}
function Badge({ status, label, onClick, className = "" }: BadgeProps) {
  const color = STATUS_COLORS?.[status];

  return (
    <div
      onClick={onClick}
      className={`rounded-full text-size12 text-inverse-fg py-xs px-md flex justify-center font-bold items-center text-center border-2 ${color} ${className}`}
    >
      {label}
    </div>
  );
}

export default Badge;
