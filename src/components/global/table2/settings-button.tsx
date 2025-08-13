import { Settings } from "lucide-react";
import { Button } from "../form/button/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/Tooltiop";
import { useModal } from "@/hooks/global/use-modal";
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
          size={"icon-circle"}
          variant={"ghost-light"}
        >
          <Settings strokeWidth={1.4} className="text-secondary-fg size-5xl pb-1" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{"الإعدادات"}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SettingsButton;
