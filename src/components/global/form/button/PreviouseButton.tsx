import { FaArrowCircleLeft} from "react-icons/fa";
import { Button } from "./Button";
import type { Dispatch, SetStateAction } from "react";
interface PreviouseButtonProps {
  title?: string;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}
const PreviouseButton = ({
  setCurrentStep,
  title = "السابق",
}: PreviouseButtonProps) => {
  return (
    <Button
      className="!h-[45px]"
      onClick={(e) => {
        e.preventDefault();
        setCurrentStep((prev) => prev - 1);
      }}
    >
      {title}
      <FaArrowCircleLeft />
    </Button>
  );
};

export default PreviouseButton;
