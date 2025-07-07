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
    <Link to={to}>
      <button className="group flex hover:bg-primary  items-center justify-between gap-4 px-6 py-3 text-2xl font-bold text-inverse-fg rounded-full bg-senary-bg transition-colors duration-300 focus:outline-none cursor-pointer ">
        <div className="flex items-center justify-between">
          {/* title */}
          <span>{title}</span>

          {/* icon */}
          <span className="mr-6 ml-6 bg-inverse-fg text-primary w-8 h-8 flex items-center justify-center rounded-2xl">
            <Icon />
          </span>
        </div>
      </button>
    </Link>
  );
}

export default InputPageButton;
