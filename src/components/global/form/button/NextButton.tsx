import { FaArrowLeftLong } from "react-icons/fa6";
interface NextButtonProps {
  id: string;
}
const NextButton = ({ id }: NextButtonProps) => {
  return (
    <button
      type="submit"
      id={id}
      className="cursor-pointer bg-[#005BBB] py-4 px-7 rounded-4xl text-white"
    >
      <div className="flex justify-between items-center">
        <p className="text-2xl">التالي</p>
        <span className="mr-5 w-8 h-8 bg-white rounded-2xl flex items-center justify-center">
          <FaArrowLeftLong className="text-[#0057B0]" />
        </span>
      </div>
    </button>
  );
};

export default NextButton;
