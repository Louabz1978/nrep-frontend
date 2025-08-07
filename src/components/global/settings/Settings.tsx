import { useAtom } from "jotai";
import { spaceSizeAtom, textSizeAtom } from "@/stores/settings";

function Settings() {
  const [textSize, setTextSize] = useAtom(textSizeAtom);

  const handleTextSizeChange = (value: number) => {
    if (value >= 0.7 && value <= 1.4) {
      setTextSize(value);
    }
  };

  const [spaceSize, setSpaceSize] = useAtom(spaceSizeAtom);

  const handleSpaceSizeChange = (value: number) => {
    if (value >= 0.7 && value <= 1.4) {
      setSpaceSize(value);
    }
  };

  return (
    <div className="flex flex-col gap-xl" dir="rtl">
      <div>
        <h4 className="text-primary-fg p-md font-bold">{"قياس الخط"}:</h4>
        <div className="flex gap-xl p-md">
          <input
            className="bg-inputColor w-full focus:bg-opacity-0 py-md text-opacity-90 focus:outline-none focus:ring-mainColor focus:ring-1 focus:ring-opacity-100 transition-all disabled:cursor-not-allowed disabled:brightness-75 text-fontColor h-[36px] px-lg border border-solid border-borderColor rounded-md"
            type="number"
            step={0.01}
            tabIndex={-1}
            onChange={(e) => {
              if (
                /^-?\d*\.?\d*$/.test(e.target.value) &&
                Number(e.target.value) <= 1.4 &&
                Number(e.target.value) >= 0.7
              ) {
                handleTextSizeChange(Number(e.target.value));
              } else {
                handleTextSizeChange(Number(textSize));
              }
            }}
            value={textSize as number}
          />
        </div>
      </div>
      <div>
        <h4 className="text-primary-fg p-md font-bold">{"الأبعاد"}:</h4>
        <div className="flex gap-xl p-md">
          <input
            className="bg-inputColor w-full focus:bg-opacity-0 py-md text-opacity-90 focus:outline-none focus:ring-mainColor focus:ring-1 focus:ring-opacity-100 transition-all disabled:cursor-not-allowed disabled:brightness-75 text-fontColor h-[36px] px-lg border border-solid border-borderColor rounded-md"
            type="number"
            step={0.01}
            tabIndex={-1}
            onChange={(e) => {
              if (
                /^-?\d*\.?\d*$/.test(e.target.value) &&
                Number(e.target.value) <= 1.4 &&
                Number(e.target.value) >= 0.7
              ) {
                handleSpaceSizeChange(Number(e.target.value));
              } else {
                handleSpaceSizeChange(Number(spaceSize));
              }
            }}
            value={spaceSize as number}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
