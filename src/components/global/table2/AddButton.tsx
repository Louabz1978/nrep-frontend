import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import { Button } from "../form/button/Button";

type Props = { to: string };

const AddButton = ({ to }: Props) => {
  return (
        <Link to={to} className="bg-primary  rounded-md cursor-pointer flex items-center gap-2  transition-colors p-sm">

            <PiPlusCircle
              strokeWidth={1.4}
              className="text-inverse-fg text-2xl"
            />
            <span className="text-inverse-fg font-medium text-size14">إضافة جهة اتصال</span>

        </Link>
  );
};

export default AddButton;
