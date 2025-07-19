import { Toaster } from "sonner";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { PiSpinner } from "react-icons/pi";
import { LuX } from "react-icons/lu";

function SonnerToast() {
  return (
    <Toaster
      position={"top-right"}
      dir="rtl"
      className="translate-x-0 translate-none z-[30]"
      icons={{
        success: <FaCircleCheck className="!size-[24.5px] !text-success" />,
        error: <FaCircleXmark className="!size-[24.5px] !text-error" />,
        loading: (
          <PiSpinner className="!size-[24.5px] animate-spin !text-primary" />
        ),
        close: <LuX className="!size-[24.5px] !text-icon" />,
      }}
      toastOptions={{
        closeButton: true,
        classNames: {
          toast:
            "flex items-center !w-[449px] justify-between !gap-[10px] !py-[32px] !border-0 !px-[24px] rounded-[8px] !border-b-[5px] !h-auto",
          content:
            "flex-1 order-2 gap-3 text-size24 !text-primary-fg font-bold",
          icon: "order-1 !size-[24.5px] !min-w-[24.5px]",
          success:
            "hover:!opacity-90 !transition-all !duration-[0.3s] !border-success",
          error:
            "hover:!opacity-90 !transition-all !duration-[0.3s] !border-error",
          loading:
            "hover:!opacity-90 !transition-all !duration-[0.3s] !border-primary",
        },
      }}
    />
  );
}

export default SonnerToast;
