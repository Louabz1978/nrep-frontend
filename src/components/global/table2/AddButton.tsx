import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/Tooltiop";
import { PiPlusCircle } from "react-icons/pi";
import { Button } from "../form/button/Button";

type Props = { to: string };

const AddButton = ({ to }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={to}>
          <Button
            className="bg-digital-green-bg !size-4xl border-0 rounded-md cursor-pointer flex justify-center items-center"
            size={"icon"}
          >
            <PiPlusCircle
              strokeWidth={1.4}
              className="text-inverse-fg size-3xl"
            />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>إضافة جهة اتصال</TooltipContent>
    </Tooltip>
  );
};

export default AddButton;
