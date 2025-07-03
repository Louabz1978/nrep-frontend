import { useEffect, useRef, useState, type ReactNode } from "react";
import ErrorComponent from "../../error/ErrorComponent";
import Loader from "../../loader/Loader";
import { GoTriangleDown } from "react-icons/go";
import { FaXmark } from "react-icons/fa6";
import handleClickOutside from "@/utils/handleClickOutside";
import { isArray } from "lodash";
import EmptyContent from "../../emptyContent/EmptyContent";
import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormSetValue,
  type UseFormTrigger,
  type UseFormWatch,
} from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface SelectProps {
  placeholder?: string;
  register?: UseFormRegister<any>;
  name: string;
  label?: string;
  labelStyle?: string;
  errors?: FieldErrors;
  element?: React.ReactNode;
  disabled?: boolean;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
  choices?: any[];
  showValue?: string;
  keyValue?: string;
  watch: UseFormWatch<any>;
  isLoading?: boolean;
  isError?: boolean;
  emptyValue?: any;
  addingStyle?: string;
  addingInputStyle?: string;
  addingSelectStyle?: string;
  addingElement?: (data: { isOpen: boolean }) => React.ReactNode;
  choiceElement?: (data: { choice: any }) => React.ReactNode;
  multiple?: boolean;
  preventRemove?: boolean;
  belowComponent?: () => React.ReactNode;
  formId?: string;
  query?: any;
  info?: string | ReactNode;
}

function Select({
  placeholder,
  // register,
  name,
  label,
  labelStyle,
  errors,
  // element,
  disabled,
  setValue,
  trigger,
  choices = [],
  showValue,
  keyValue,
  watch,
  isLoading,
  isError,
  emptyValue = null,
  addingStyle = "",
  addingInputStyle = "",
  addingSelectStyle = "",
  addingElement = () => null,
  choiceElement = () => null,
  multiple = false,
  preventRemove = false,
  belowComponent,
  formId, // query
  info,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const clickRef = useRef<HTMLDivElement>(null);
  useEffect(() => handleClickOutside(clickRef, setIsOpen, null), []);

  // handle choice click
  function handleChoiceClick(e: React.MouseEvent, choice: any, key?: number) {
    if ((e?.target as HTMLElement)?.id == "prevent-click") return;
    let finalChoice = choice;
    if (typeof choice == "string") {
      const [rtlPart, ltrPart] = finalChoice.split(" - ");
      if (ltrPart) finalChoice = `${ltrPart} - ${rtlPart}`;
    }

    const isChoosen = multiple
      ? keyValue
        ? watch(name).filter(
            (ele: any) =>
              ele?.[showValue as string] == finalChoice?.[showValue as string]
          )?.length
        : watch(name)?.includes(finalChoice)
      : keyValue
      ? finalChoice[keyValue] == watch(name)?.[keyValue]
      : finalChoice == watch(name);

    // remove
    if (isChoosen) {
      if (preventRemove) return;
      // if multiple
      if (multiple) {
        if (keyValue) {
          const index = watch(name).findIndex(
            (ele: any) => ele[keyValue] == finalChoice[keyValue]
          );
          const newValue = [...watch(name)];
          newValue.splice(index, 1);
          setValue(name, newValue);
        } else {
          const index = watch(name).findIndex((ele: any) => ele == finalChoice);
          const newValue = [...watch(name)];
          newValue.splice(index, 1);
          setValue(name, newValue);
        }
      }
      // single
      else setValue(name, emptyValue);
    }
    // add
    else {
      // multiple
      if (multiple) {
        setValue(name, [...watch(name), finalChoice]);
      }
      // single
      else {
        setValue(name, finalChoice);
        setIsOpen(false);
      }
    }
    trigger(name);
    if (key !== undefined) setFocusedChoose(key);
  }

  // the focused option
  const [focusedChoose, setFocusedChoose] = useState<number | null>(null);
  // scroll to the focused row to be on screen
  useEffect(() => {
    if (focusedChoose !== null) {
      document
        .getElementById(`option_${name}_${focusedChoose}_${formId}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
    }
  }, [focusedChoose, isOpen]);
  // handle press down and up key press
  function handleKeyDown(e: React.KeyboardEvent) {
    // transition up and down between the options
    if (e.key == "ArrowDown" && !e.ctrlKey) {
      e.preventDefault();
      setFocusedChoose((prev) => {
        return choices?.length == 0
          ? null
          : prev === null
          ? 0
          : Math.min(prev + 1, choices?.length - 1);
      });
    } else if (e.key == "ArrowUp") {
      e.preventDefault();
      setFocusedChoose((prev) => {
        return choices?.length == 0
          ? null
          : prev === null
          ? null
          : Math.max(prev - 1, 0);
      });
    } else if (e.key == "Enter") {
      e.preventDefault();
      // choose the focused option
      if (focusedChoose !== null && isOpen) {
        handleChoiceClick(
          e as unknown as React.MouseEvent,
          choices?.[focusedChoose],
          focusedChoose
        );
      }
      // open select options
      if (!isOpen) setIsOpen(true);
    } else if (e.key == "Tab") {
      setIsOpen(false);
    }
  }

  // scroll to the end of options section when open the select field options
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref?.current && isOpen) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isOpen]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className={`flex flex-col w-full ${addingStyle}`}>
      {/* select label  */}
      {label ? (
        <label
          htmlFor={name}
          className={`text-primary-foreground mb-2 font-black ${labelStyle}`}
        >
          {label}
        </label>
      ) : null}

      {/* select container to link choices list to its position */}
      <div
        ref={clickRef}
        className={`relative w-full flex items-center gap-1 ${addingSelectStyle}`}
      >
        <div className="flex-1 relative flex items-center">
          {/* select */}
          <button
            type="button"
            className={`custom-input custom-select  border-2 h-[40px] bg-white text-black px-4 py-2 ${
              errors?.[name]
                ? "border-red-500"
                : "border-[#1C2026] focus:ring-2 focus:ring-[#1C2026]"
            } ${addingInputStyle} ${
              isOpen ? "rounded-t-[16px]" : "rounded-[16px]"
            } flex justify-between items-center cursor-pointer`}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
              e.preventDefault();
              if (!disabled) setIsOpen((prev) => !prev);
            }}
          >
            <div className="overflow-auto text-nowrap">
              {(watch(name) && !isArray(watch(name))) ||
              (isArray(watch(name)) && watch(name).length) ? (
                !multiple ? (
                  showValue ? (
                    watch(name)[showValue]
                  ) : (
                    watch(name)
                  )
                ) : showValue ? (
                  watch(name).map((ele: any, index: number) => {
                    return `${ele[showValue]}${
                      index + 1 == watch(name).length ? "" : " - "
                    }`;
                  })
                ) : (
                  <div className="flex items-center overflow-auto gap-[4px]">
                    {watch(name).map((ele: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="py-[2px] group px-[6px] flex items-center gap-[4px] rounded-[5px] bg-primary/80 text-white"
                        >
                          {ele}

                          <FaXmark
                            className="size-[12px] text-white/80 hidden group-hover:block hover:text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleChoiceClick(e, ele);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                <span className="text-placeholder">{placeholder}</span>
              )}
            </div>

            {/* delete option */}
            {!multiple && !preventRemove && watch(name) ? (
              <span
                title="إفراغ"
                className={`relative font-light text-size12 p-1 text-error rounded-full bg-error/30 opacity-50 hover:opacity-100 transition-all duration-[0.2s] mr-auto`}
              >
                <FaXmark />
                <div
                  className="absolute w-full h-full top-0 left-0"
                  id={`dont-close`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChoiceClick(e, watch(name));
                  }}
                ></div>
              </span>
            ) : null}

            {/* select arrow */}
            <div
              className={`relative toggle-button ${
                isOpen ? "rotate-180 duration-[0.3s]" : "duration-[0.3s]"
              } transition-all`}
            >
              <GoTriangleDown />
            </div>
          </button>

          {/* choices list */}
          <div
            className={`bg-secondary-block-background/65 backdrop-blur-[15px] rounded-b-[6px] z-[15] absolute bottom-0 translate-y-full w-full ${
              isOpen
                ? "h-[240px] overflow-auto py-1 pt-0"
                : "h-0 overflow-hidden"
            } transition-all flex flex-col gap-1 px-1 shadow-md `}
          >
            <div className="bg-secondary-block-background/65 backdrop-blur-[15px] pt-2 z-[2] sticky top-0">
              <input
                type="text"
                id={`select_${name}_search_${formId}`}
                autoFocus={true}
                className="w-full outline-none focus:outline-none focus-visible:outline-none bg-background/65 backdrop-blur-[15px] focus:bg-background/30 py-2 px-3 border-solid border border-border text-primary-foreground/90 rounded-[3px]"
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                autoComplete={"off"}
                onKeyDown={(e) => {
                  if (e.key == "ArrowDown") {
                    e.preventDefault();
                  } else if (e.key == "ArrowUp") {
                    e.preventDefault();
                  }
                }}
              />
            </div>

            <div className="h-full overflow-auto">
              {isError ? (
                <ErrorComponent />
              ) : isLoading ? (
                <Loader />
              ) : choices?.length == 0 ? (
                <EmptyContent />
              ) : (
                choices?.map((choice: any, key: number) => {
                  let finalChoice = choice;
                  if (typeof choice == "string") {
                    const [rtlPart, ltrPart] = finalChoice.split(" - ");
                    if (ltrPart) finalChoice = `${ltrPart} - ${rtlPart}`;
                  }

                  const isChoosen = multiple
                    ? keyValue
                      ? watch(name).filter(
                          (ele: any) =>
                            ele[showValue as string] ==
                            finalChoice[showValue as string]
                        )?.length
                      : watch(name)?.includes(finalChoice)
                    : keyValue
                    ? finalChoice[keyValue] == watch(name)?.[keyValue]
                    : finalChoice == watch(name);

                  if (
                    !searchTerm ||
                    (!showValue && finalChoice?.includes(searchTerm)) ||
                    (showValue &&
                      finalChoice?.[showValue]?.includes(searchTerm))
                  )
                    return (
                      <div
                        key={key}
                        onClick={(e) => {
                          handleChoiceClick(e, choice, key);
                        }}
                        className={`py-2 px-3 flex items-center cursor-pointer group relative ${
                          focusedChoose == key
                            ? "border-solid border border-primary"
                            : "border-solid border border-transparent"
                        } ${
                          isChoosen
                            ? "bg-secondary-foreground rounded-md text-white"
                            : "hover:bg-secondary-foreground/20 rounded-md text-primary-foreground/80"
                        } transition-all duration-[0.1s]`}
                        id={`option_${name}_${key}_${formId}`}
                      >
                        {showValue ? choice[showValue] : choice}
                        {choiceElement({ choice })}
                      </div>
                    );
                })
              )}
            </div>
          </div>
        </div>

        {/* pseudo div to scroll to it when open the select to show the whole options section body on screen */}
        {isOpen ? (
          <div
            ref={ref}
            className="absolute top-[240px] h-[10px] w-[10px]"
          ></div>
        ) : null}

        {/* adding element */}
        {addingElement({ isOpen })}

        {/* beside element */}
        {info ? (
          <IoIosInformationCircleOutline className="cursor-pointer text-[#585858] size-[24px] min-w-[18px]" />
        ) : null}
      </div>
      {/* validation errors  */}
      {errors?.[name] ? (
        <span className="text-error text-size14">
          {errors?.[name]?.message as ReactNode}
        </span>
      ) : null}
      {belowComponent ? belowComponent() : null}
    </div>
  );
}

export default Select;
