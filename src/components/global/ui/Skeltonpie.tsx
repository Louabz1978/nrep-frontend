import { PiChartPieDuotone } from "react-icons/pi";

const SkeltonPie = () => {
  return (
    <div className="space-y-4">
      <div className="h-[250px] w-full flex items-center justify-center">
        <div className="relative" style={{ width: 250, height: 250 }}>
          <PiChartPieDuotone className="size-[250px] text-gray-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SkeltonPie;
