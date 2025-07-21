import { FaArrowCircleLeft } from "react-icons/fa";
import { Button } from "./Button";
import type { ReactNode } from "react";
interface NextButtonProps {
  id: string;
  title?: string;
  icon?: ReactNode;
}
const NextButton = ({
  id,
  title = "التالي",
  icon = <FaArrowCircleLeft />,
}: NextButtonProps) => {
  return (
    <Button type="submit" className="!h-[40px] w-[200px] rounded px-6 py-4 gap-2.5 flex items-center justify-between cursor-pointer" id={id}>
      <span className="flex-1">{title}</span>
      <span className="w-[30px] h-[30px] flex justify-center items-center">{icon}</span>
    </Button>
  );
};

export default NextButton;
