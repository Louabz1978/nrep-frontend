import { STATUS_COLORS, STATUS_TEXT } from "@/data/global/select";
import type { ReactNode } from "react";

interface BadgeProps {
  status: keyof typeof STATUS_COLORS;
  label: ReactNode;
  onClick?: () => void;
  className?: string;
}
function Badge({ status, label, onClick, className = "" }: BadgeProps) {
  const color = STATUS_COLORS?.[status];
  const text = STATUS_TEXT?.[status];

  return (
    <div
      onClick={onClick}
      className={`rounded-full text-size12 py-md px-lg px-md font-medium flex justify-center items-center text-center ${color} ${text} ${className}`}
    >
      {label}
    </div>
  );
}

export default Badge;
