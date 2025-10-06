import type { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

interface InputPageButtonProps {
  to: string;
  icon: IconType;
  title: string;
}

// input page button, gets:
// to: page href
// icon: icon of this button
// title: button title
function InputPageButton({ to, icon: Icon, title }: InputPageButtonProps) {
  return (
    <Link
      to={to}
      className="group flex items-center hover:bg-[#054239] px-lg py-md gap-2xl justify-center flex-1 text-size20 text-inverse-fg rounded-full bg-secondary transition-colors duration-[0.3s]] focus:outline-none cursor-pointer"
    >
      {/* title */}
      <span>{title}</span>

      {/* icon */}
      <span className="bg-tertiary-bg text-secondary size-[28px] flex items-center justify-center rounded-full">
        <Icon />
      </span>
    </Link>
  );
}

export default InputPageButton;
