import { STATUS_COLORS } from "@/data/global/select";

interface BadgeProps {
  status: keyof typeof STATUS_COLORS;
  label: string;
}
function Badge({ status, label }: BadgeProps) {
  const color = STATUS_COLORS?.[status];

  return (
    <div
      className={`rounded-full text-size12 text-inverse-fg py-xs px-md flex justify-center font-bold items-center text-center border-2 ${color}`}
    >
      {label}
    </div>
  );
}

export default Badge;
