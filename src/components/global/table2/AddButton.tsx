
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/Tooltiop";

type Props = { to: string };

const AddButton = ({ to }: Props) => {
  return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={to}>
            <Button className="bg-digital-green-bg border-0 rounded-md cursor-pointer" size={"icon"}>
              <CiCirclePlus strokeWidth={1.4} className="text-tertiary-bg size-4xl" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>إضافة بائع جديد</TooltipContent>
      </Tooltip>
  );
};

export default AddButton;
