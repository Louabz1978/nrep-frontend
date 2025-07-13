import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import handleClickOutside from "@/utils/handleClickOutside";
import { useUser } from "@/stores/useUser";
import type WEBSITE_PERMISSIONS from "@/data/website/permissions";
import type ADMIN_PERMISSIONS from "@/data/admin/permissoins";

interface Action {
  title: string;
  onClick: () => void;
  permissions?: (
    | keyof typeof WEBSITE_PERMISSIONS
    | keyof typeof ADMIN_PERMISSIONS
  )[];
  disabled?: boolean;
}

interface ActionsProps {
  actions: Action[];
  index?: number;
  pageName: string;
  Icon?: React.ComponentType;
  className?: string;
}

function Actions({
  actions,
  index,
  pageName,
  Icon = BsThreeDots,
  className = "",
}: ActionsProps) {
  const { checkPermissions } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      handleClickOutside(ref, setIsOpen, `close-options-${pageName}-${index}`),
    [index, pageName]
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
              className={`p-2 text-primary-foreground w-full min-w-[150px] bg-tertiary/50 backdrop-blur-[15px] border-b border-solid border-primary-foreground/10 last:border-b-0 ${
                (!action?.permissions ||
                  checkPermissions(action?.permissions)) &&
                !action?.disabled
                  ? "cursor-pointer hover:bg-tertiary/80"
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
