import {  FaArrowCircleRight } from "react-icons/fa";
import { Button } from "./Button";
interface NextButtonProps {
  id: string;
  title?: string;
}
const NextButton = ({ id, title = "التالي" }: NextButtonProps) => {
  return (
    <Button type="submit" className="!h-[45px]" id={id}>
      <FaArrowCircleRight />

      {title}
    </Button>
  );
};

export default NextButton;
