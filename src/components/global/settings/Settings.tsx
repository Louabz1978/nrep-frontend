import { useAtom } from "jotai";
import { textSizeAtom } from "@/stores/settings";
import { useEffect } from "react";

function Settings() {
  const [textSize, setTextSize] = useAtom(textSizeAtom);

  // Apply text size whenever it changes
  useEffect(() => {
    document
      .querySelector(":root")
      ?.style.setProperty("--text-factor", textSize);
  }, [textSize]);

  const handleTextSizeChange = (value: number) => {
    if (value >= 0.7 && value <= 1.4) {
      setTextSize(value);
    }
  };

  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <div>
        <h4 className="text-primary-fg p-2 font-bold">{"قياس الخط"}:</h4>
        <div className="flex gap-4 p-2">
          <input
            className="bg-inputColor w-full focus:bg-opacity-0 py-2 text-opacity-90 focus:outline-none focus:ring-mainColor focus:ring-1 focus:ring-opacity-100 transition-all disabled:cursor-not-allowed disabled:brightness-75 text-fontColor h-[36px] px-3 border border-solid border-borderColor rounded-md"
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
    </div>
  );
}

export default Settings;
