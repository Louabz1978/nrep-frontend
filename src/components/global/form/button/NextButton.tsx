import { FaArrowCircleLeft } from "react-icons/fa";
import { Button } from "./Button";
interface NextButtonProps {
  id: string;
  title: string;
}
const NextButton = ({ id, title }: NextButtonProps) => {
  return (
    <Button type="submit" className="!h-[45px]" id={id}>
      {title}
      <FaArrowCircleLeft />
    </Button>
  );
};

export default NextButton;
