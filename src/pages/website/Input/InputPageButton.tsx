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
      className="group flex hover:bg-primary px-[10px] py-[8px] gap-[25px] justify-center flex-1 text-2xl text-inverse-fg rounded-full bg-quaternary-bg transition-colors duration-300 focus:outline-none cursor-pointer"
    >
      {/* title */}
      <span>{title}</span>

      {/* icon */}
      <span className="bg-inverse-fg text-primary w-8 h-8 flex items-center justify-center rounded-2xl">
        <Icon />
      </span>
    </Link>
  );
}

export default InputPageButton;
