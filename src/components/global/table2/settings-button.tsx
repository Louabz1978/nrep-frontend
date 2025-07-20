import { Settings } from "lucide-react";
import { Button } from "../ui/button";
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
          <Settings strokeWidth={1.4} className="text-secondary-fg" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{"الإعدادات"}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SettingsButton;
