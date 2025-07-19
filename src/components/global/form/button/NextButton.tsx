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
    <Button type="submit" className="!h-[45px]" id={id}>
      {title}
      {icon}
    </Button>
  );
};

export default NextButton;
