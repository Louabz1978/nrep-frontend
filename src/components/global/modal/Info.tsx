import { Fragment, useState, type ReactNode } from "react";
import { FaXmark } from "react-icons/fa6";
import Modal from "./Modal";
import { IoInformationCircleOutline } from "react-icons/io5";

interface InfoProps {
  info: string | ReactNode;
}
function Info({ info }: InfoProps) {
  // open info popup
  const [isOpenInof, setIsOpenInfo] = useState<boolean | null | number>(false);

  return (
    <Fragment>
      <IoInformationCircleOutline
        onClick={() => setIsOpenInfo(true)}
        className="cursor-pointer text-primary-fg self-end size-[24px] min-w-[24px]"
      />
      <Modal isOpen={isOpenInof} setIsOpen={setIsOpenInfo}>
        <div className="w-[40vw] min-h-[40svh] max-h-[80svh] flex flex-col gap-[20px]">
          <div className="py-[10px] px-[20px] flex justify-end border-b border-border">
            <FaXmark
              onClick={() => setIsOpenInfo(false)}
              className="text-primary-icon cursor-pointer hover:text-primary-fg transition-all duration-[0.3s]"
            />
          </div>
          <div className="px-[20px] text-size24">{info}</div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Info;
