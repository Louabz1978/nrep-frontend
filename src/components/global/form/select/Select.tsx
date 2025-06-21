import { useEffect, useRef, useState } from "react";
import ErrorComponent from "../../error/ErrorComponent";
import Loader from "../../loader/Loader";
import { GoTriangleDown } from "react-icons/go";
import { FaXmark } from "react-icons/fa6";
import handleClickOutside from "@/utils/handleClickOutside";
import { isArray } from "lodash";
import EmptyContent from "../../emptyContent/EmptyContent";

function Select({
  placeholder,
  register,
  name,
  label,
  errors,
  element,
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
  addingElement = () => {},
  choiceElement = () => {},
  multiple = false,
  preventRemove = false,
  belowComponent,
  formId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const clickRef = useRef();
  useEffect(() => handleClickOutside(clickRef, setIsOpen, null), []);

  // handle choice click
  function handleChoiceClick(e, choice, key) {
    if (e?.target?.id == "prevent-click") return;
    let finalChoice = choice;
    if (typeof choice == "string") {
      const [rtlPart, ltrPart] = finalChoice.split(" - ");
      if (ltrPart) finalChoice = `${ltrPart} - ${rtlPart}`;
    }

    const isChoosen = multiple
      ? keyValue
        ? watch(name).filter((ele) => ele[showValue] == finalChoice[showValue])
            ?.length
        : watch(name)?.includes(finalChoice[keyValue])
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
            (ele) => ele[keyValue] == finalChoice[keyValue]
          );
          watch(name).splice(index, 1);
        } else {
          const index = watch(name).findIndex(
            (ele) => ele[showValue] == finalChoice[showValue]
          );
          watch(name).splice(index, 1);
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
    if (key) setFocusedChoose(key);
  }

  // the focused option
  const [focusedChoose, setFocusedChoose] = useState(null);
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
  function handleKeyDown(e) {
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
        handleChoiceClick(e, choices?.[focusedChoose], focusedChoose);
      }
      // open select options
      if (!isOpen) setIsOpen(true);
    } else if (e.key == "Tab") {
      setIsOpen(false);
    }
  }

  // scroll to the end of options section when open the select field options
  const ref = useRef();
  useEffect(() => {
    if (ref?.current && isOpen) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isOpen]);

  const [searchTerm, setSearchTerm] = useState();

  return (
    <div className={`flex flex-col w-full ${addingStyle}`}>
      {/* select label  */}
      {label ? (
        <label htmlFor={name} className="text-fontColor mb-2">
          {label}
        </label>
      ) : null}

      {/* select container to link choices list to its position */}
      <div
        ref={clickRef}
        className={`relative w-full flex gap-1 ${addingSelectStyle}`}
      >
        {/* select */}
        <button
          type="button"
          className={`custom-select ${addingInputStyle} ${
            isOpen ? "rounded-t-[6px]" : "rounded-[6px]"
          } flex justify-between items-center cursor-pointer`}
          onKeyDown={handleKeyDown}
          onClick={(e) => {
            e.preventDefault;
            if (!disabled) setIsOpen((prev) => !prev);
          }}
        >
          <div className="overflow-auto text-nowrap">
            {watch(name) &&
            (!isArray(watch(name)) ||
              (isArray(watch(name)) && watch(name).length)) ? (
              !multiple ? (
                showValue ? (
                  watch(name)[showValue]
                ) : (
                  watch(name)
                )
              ) : showValue ? (
                watch(name).map((ele, index) => {
                  return `${ele[showValue]}${
                    index + 1 == watch(name).length ? "" : " - "
                  }`;
                })
              ) : (
                watch(name).map((ele, index) => {
                  return `${ele}${
                    index + 1 == watch(name).length ? "" : " - "
                  }`;
                })
              )
            ) : (
              <span className="text-placeholderColor">{placeholder}</span>
            )}
          </div>

          {/* delete option */}
          {!multiple && !preventRemove && watch(name) ? (
            <span
              title="إفراغ"
              className={`relative font-light text-size12 p-1 text-errorColor rounded-full bg-errorColor bg-opacity-30 opacity-50 hover:opacity-100 transition-all duration-[0.2s] mr-auto`}
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
          className={`bg-secondBlockBackgroundColor bg-opacity-65 backdrop-blur-[15px] rounded-b-[6px] z-[15] absolute bottom-0 translate-y-full w-full ${
            isOpen ? "h-[240px] overflow-auto py-1 pt-0" : "h-0 overflow-hidden"
          } transition-all flex flex-col gap-1 px-1 shadow-md `}
        >
          <div className="bg-secondBlockBackgroundColor bg-opacity-65 backdrop-blur-[15px] pt-2 z-[2] sticky top-0">
            <input
              type="text"
              id={`select_${name}_search_${formId}`}
              autoFocus={true}
              className="w-full bg-backgroundColor bg-opacity-65 backdrop-blur-[15px] focus:bg-opacity-30 py-2 px-3 border-solid border border-borderColor text-fontColor text-opacity-90 rounded-[3px]"
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
              <EmptyContent width="w-[100px]" fontSize="text-size12" />
            ) : (
              choices?.map((choice, key) => {
                let finalChoice = choice;
                if (typeof choice == "string") {
                  const [rtlPart, ltrPart] = finalChoice.split(" - ");
                  if (ltrPart) finalChoice = `${ltrPart} - ${rtlPart}`;
                }

                const isChoosen = multiple
                  ? keyValue
                    ? watch(name).filter(
                        (ele) => ele[showValue] == finalChoice[showValue]
                      )?.length
                    : watch(name)?.includes(finalChoice)
                  : keyValue
                  ? finalChoice[keyValue] == watch(name)?.[keyValue]
                  : finalChoice == watch(name);

                if (
                  !searchTerm ||
                  (!showValue && finalChoice?.includes(searchTerm)) ||
                  (showValue && finalChoice?.[showValue]?.includes(searchTerm))
                )
                  return (
                    <div
                      key={key}
                      onClick={(e) => {
                        handleChoiceClick(e, choice, key);
                      }}
                      className={`py-2 px-3 flex items-center cursor-pointer group relative ${
                        focusedChoose == key
                          ? "border-solid border border-mainColor"
                          : "border-solid border border-transparent"
                      } ${
                        isChoosen
                          ? "bg-secondFontColor rounded-md text-whiteColor"
                          : "hover:bg-secondFontColor hover:bg-opacity-20 rounded-md text-fontColor text-opacity-80"
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

        {/* pseudo div to scroll to it when open the select to show the whole options section body on screen */}
        {isOpen ? (
          <div
            ref={ref}
            className="absolute top-[240px] h-[10px] w-[10px]"
          ></div>
        ) : null}

        {/* adding element */}
        {addingElement({ isOpen })}
      </div>
      {/* validation errors  */}
      {errors?.[name] ? (
        <span className="text-errorColor text-size14">
          {errors[name].message}
        </span>
      ) : null}
      {belowComponent ? belowComponent() : null}
    </div>
  );
}

export default Select;
