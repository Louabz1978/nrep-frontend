import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

type Props = { to: string; addLabel?: string };

const AddButton = ({ to, addLabel = "إضافة جهة اتصال" }: Props) => {
  return (
    <Link
      to={to}
      className="flex items-center justify-between gap-xl bg-primary p-sm rounded-md text-tertiary-bg"
    >
      <span>{addLabel}</span>
      <FaPlus />
    </Link>
  );
};

export default AddButton;
