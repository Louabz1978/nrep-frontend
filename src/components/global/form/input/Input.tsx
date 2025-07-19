import { useState, type ReactNode } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import {
  type UseFormTrigger,
  type UseFormReturn,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";
import Info from "../../modal/Info";
import getError, { isValid } from "@/utils/getErrors";
import Toggle from "../toggle/Toggle"; // <-- add Toggle import

interface InputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  type?: string;
  placeholder?: string;
  name: Path<T>;
  label?: string;
  labelStyle?: string;
  element?: React.ReactNode;
  disabled?: boolean;
  addingStyle?: string;
  addingInputStyle?: string;
  customInput?: React.ReactNode;
  step?: number;
  numberRegex?: RegExp;
  onClick?: () => void;
  onFocus?: () => void;
  onChange?: (data: { trigger: UseFormTrigger<T> }) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
  info?: string | ReactNode;
  addingValidStyle?: string;
  bottomElement?: string | ReactNode;
  required?: boolean;
  toggle?: Path<T>;
}

// gets: input type, input placeholder, register method of react hook form, key name of input field in schema, input label, validation errors from react hook form, custom element beside checkbox input, and flag to specify if the input is disabled or not
// returns: input component controlled by react hook form
function Input<T extends FieldValues>({
  form,
  type = "text",
  placeholder,
  name,
  label,
  labelStyle,
  element,
  disabled,
  addingStyle = "",
  addingValidStyle = "",
  addingInputStyle = "",
  customInput,
  step = 1,
  numberRegex = /^\d*\.?\d*$/,
  onClick = () => {},
  onFocus = () => {},
  onChange = () => {},
  onBlur = () => {},
  min,
  max,
  info,
  bottomElement,
  required,
  toggle,
}: InputProps<T>) {
  // to show password
  const [show, setShow] = useState(false);
  const {
    watch,
    register,
    setValue,
    formState: { errors },
    trigger,
  } = form;

  // Compute isDisabled so that it updates when toggle changes
  const toggleValue = toggle ? watch(toggle) : undefined;
  const isDisabled = disabled || (toggle && !watch(toggle));

  // Handler to update toggle and force re-render
  const handleToggleChange = () => {
    // If toggle is provided, flip its value
    if (toggle) {
      setValue(toggle, !toggleValue as PathValue<T, Path<T>>);
      trigger?.(toggle);
    }
    // Also trigger the main input for validation
    trigger?.(name);
  };

  return (
    <>
      {/* checkbox input with its style */}
      {type == "checkbox" ? (
        <div className={`flex flex-col ${addingStyle}`}>
          <label
            htmlFor={name}
            className={`flex items-center gap-2 cursor-pointer ${addingInputStyle}`}
          >
            <input
              type={type}
              className="peer hidden"
              id={name}
              {...(register ? register(name) : {})}
              disabled={isDisabled}
              onChange={(e) => {
                setValue(
                  name,
                  (e?.target?.checked ? true : false) as PathValue<T, Path<T>>
                );
                trigger?.(name);
                onChange({ trigger } as { trigger: UseFormTrigger<T> });
              }}
              checked={watch?.(name) ? true : false}
            />
            {/* checkbox presentation */}
            <div className="w-[20px] max-w-[20px] min-w-[20px] h-[20px] max-h-[20px] min-h-[20px] bg-secondary-background rounded-sm right-[2px] peer-checked:bg-secondary-foreground transition-all duration-[0.1s]"></div>

            <div className="flex items-center gap-2">
              {label}
              {required && !isDisabled ? (
                <span className="text-size22 text-error">{" *"}</span>
              ) : null}
              {/* Toggle switch for enabling/disabling input, if toggle prop is provided */}
              {toggle ? (
                <Toggle
                  form={form}
                  name={toggle}
                  label=""
                  onChange={handleToggleChange}
                />
              ) : null}
            </div>
            {element ? element : null}
          </label>
          {getError(errors, name) ? (
            <span className="text-error text-size14">
              {(getError(errors, name) as { message: string })?.message}
            </span>
          ) : null}
        </div>
      ) : (
        // other normal inputs
        <div
          className={`flex flex-col w-full gap-[4px] ${addingStyle}`}
          onClick={onClick}
        >
          {/* input label  */}
          {label ? (
            <label
              htmlFor={name}
              className={`text-size22 font-medium text-primary-fg cursor-pointer ${labelStyle}`}
            >
              <span className="flex items-center gap-2">
                {label}
                {required && !isDisabled ? (
                  <span className="text-size22 text-error">{" *"}</span>
                ) : null}
                {/* Toggle switch for enabling/disabling input, if toggle prop is provided */}
                {toggle ? (
                  <Toggle
                    form={form}
                    name={toggle}
                    label=""
                    onChange={handleToggleChange}
                  />
                ) : null}
              </span>
            </label>
          ) : null}

          <div className="w-full flex flex-col gap-[4px]">
            {/* input container to link icon to its position */}
            <div className="relative flex items-center gap-[15px]">
              <div className="relative flex-1 flex items-center overflow-hidden">
                {/* input with react hook form register control  */}
                {type == "custom" ? (
                  <div className="custom-input">{customInput}</div>
                ) : type == "number" ? (
                  <input
                    type={"number"}
                    placeholder={placeholder}
                    id={name}
                    {...(register ? register(name) : {})}
                    disabled={isDisabled}
                    className={`flex-1 h-[40px] text-[16.36px] ${
                      isDisabled ? "bg-secondary-background" : "bg-input-bg"
                    } p-[12.72px] border-[1.64px] text-primary-fg rounded-[7.92px] overflow-auto outline-none focus-visible:border-[3px] focus-visible:outline-none placeholder:text-placeholder transition-colors duration-[0.3s] ${
                      getError(errors, name)
                        ? "border-error"
                        : `${
                            isValid(form)
                              ? "focus-visible:border-success"
                              : "focus-visible:border-secondary"
                          } hover:border-secondary ${
                            addingValidStyle
                              ? addingValidStyle
                              : "border-secondary-border"
                          }`
                    } ${addingInputStyle}`}
                    onChange={(e) => {
                      if (
                        numberRegex.test(e.target.value) &&
                        (!min || Number(e.target.value) >= min) &&
                        (!max || Number(e.target.value) <= max)
                      ) {
                        if (e.target.value === "") {
                          setValue(name, undefined as PathValue<T, Path<T>>);
                        } else {
                          setValue(
                            name,
                            Number(e.target.value) as PathValue<T, Path<T>>
                          );
                        }
                        trigger?.(name);
                      }
                    }}
                    value={watch?.(name) ?? undefined}
                    step={step}
                  />
                ) : (
                  <input
                    type={show ? "text" : type}
                    placeholder={placeholder}
                    id={name}
                    {...(register ? register(name) : {})}
                    disabled={isDisabled}
                    className={`flex-1 h-[40px] text-[16.36px] ${
                      isDisabled ? "bg-secondary-background" : "bg-input-bg"
                    } p-[12.72px] border-[1.64px] text-primary-fg rounded-[7.92px] overflow-auto outline-none focus-visible:border-[3px] focus-visible:outline-none placeholder:text-placeholder transition-colors duration-[0.3s] ${
                      getError(errors, name)
                        ? "border-error"
                        : `${
                            isValid(form)
                              ? "focus-visible:border-success"
                              : "focus-visible:border-secondary"
                          } hover:border-secondary ${
                            addingValidStyle
                              ? addingValidStyle
                              : "border-secondary-border"
                          }`
                    } ${
                      type == "password" ? "!pl-[56px]" : ""
                    } ${addingInputStyle}`}
                    // border-gold-background focus:ring-gold-background rounded-lg
                    step={step}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                )}
                {/* show input content with password input type */}
                {type == "password" ? (
                  <div
                    className="text-primary-fg/80 hover:text-primary-fg/100 transition-all absolute h-[calc(100%_-_3.28px)] rounded-l-[12.27px] aspect-square left-[1.64px] bg-transparent top-[50%] -translate-y-[50%] flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      if (type == "password") setShow(!show);
                    }}
                  >
                    {/* toggle icon depending on show value */}
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </div>
                ) : null}
              </div>

              {/* beside element */}
              {info ? <Info info={info} /> : null}
            </div>

            {/* validation errors  */}
            {getError(errors, name) ? (
              <span className="text-error font-medium text-size16">
                {(getError(errors, name) as { message: string })?.message}
              </span>
            ) : null}

            {/* bottom element */}
            {bottomElement ? bottomElement : null}
          </div>
        </div>
      )}
    </>
  );
}

export default Input;
