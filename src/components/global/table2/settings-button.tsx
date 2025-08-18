import { Button } from "../form/button/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/Tooltiop";
import { useModal } from "@/hooks/global/use-modal";
import { PiGear } from "react-icons/pi";
type Props = { id: string };
const SettingsButton = ({ id }: Props) => {
  const { openModal } = useModal();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => {
            openModal(`table-${id}`);
          }}
          className="bg-primary border-0 !size-4xl rounded-md cursor-pointer flex justify-center items-center"
          size={"icon"}
        >
          <PiGear className="text-inverse-fg size-3xl" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>الإعدادات</TooltipContent>
    </Tooltip>
  );
};

export default SettingsButton;
