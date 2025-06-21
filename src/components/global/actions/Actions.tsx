import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import handleClickOutside from "../../../functions/common/handleClickOutside";
import { useUserInformationContext } from "../../../contexts/common/UserInformationContextProvider";

function Actions({
  actions,
  index,
  pageName,
  Icon = BsThreeDots,
  className = "",
}) {
  // check permissions method
  const { checkPermissions } = useUserInformationContext();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  useEffect(
    () =>
      handleClickOutside(ref, setIsOpen, `close-options-${pageName}-${index}`),
    []
  );

  return (
    <div className="relative">
      <div className="relative">
        <Icon />
        <div
          className="absolute w-full h-full top-0 left-0 cursor-pointer"
          id={`close-options-${pageName}-${index}`}
          onClick={() => setIsOpen((prev) => !prev)}
        ></div>
      </div>

      <div
        ref={ref}
        className={`absolute bottom-0 translate-y-full overflow-auto right-0 translate-x-full z-[10] ${
          isOpen ? "scale-100" : "scale-0"
        } origin-top-left transition-all duration-[0.2s] w-max max-w-[150px] h-max max-h-[200px] overflow-auto rounded-md ${className}`}
      >
        {actions?.map((action, index) => {
          return (
            <div
              key={index}
              title={
                !action?.permissions || checkPermissions(action?.permissions)
                  ? ""
                  : "لا تملك صلاحية"
              }
              className={`p-2 text-fontColor w-full min-w-[150px] bg-thirdColor bg-opacity-50 backdrop-blur-[15px] border-b border-solid border-fontColor border-opacity-10 last:border-b-0 ${
                (!action?.permissions ||
                  checkPermissions(action?.permissions)) &&
                !action?.disabled
                  ? "cursor-pointer hover:bg-opacity-80"
                  : "brightness-[0.8] cursor-not-allowed"
              }`}
              onClick={() => {
                if (
                  (!action?.permissions ||
                    checkPermissions(action?.permissions)) &&
                  !action?.disabled
                ) {
                  action.onClick();
                  setIsOpen(false);
                }
              }}
            >
              {action.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Actions;
