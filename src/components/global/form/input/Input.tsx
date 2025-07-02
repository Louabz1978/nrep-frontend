import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormSetValue,
  type UseFormTrigger,
  type UseFormWatch,
} from "react-hook-form";

interface InputProps {
  type?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  name: string;
  label?: string;
  labelStyle?: string;
  errors?: any;
  element?: React.ReactNode;
  disabled?: boolean;
  addingStyle?: string;
  addingInputStyle?: string;
  customInput?: React.ReactNode;
  step?: number;
  setValue?: UseFormSetValue<any>;
  trigger?: UseFormTrigger<any>;
  watch?: UseFormWatch<any>;
  numberRegex?: RegExp;
  onClick?: () => void;
  onFocus?: () => void;
  onChange?: (data: { trigger: UseFormTrigger<any> }) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
}

// gets: input type, input placeholder, register method of react hook form, key name of input field in schema, input label, validation errors from react hook form, custom element beside checkbox input, and flag to specify if the input is disabled or not
// returns: input component controlled by react hook form
function Input({
  type = "text",
  placeholder,
  register,
  name,
  label,
  labelStyle,
  errors,
  element,
  disabled,
  addingStyle = "",
  addingInputStyle = "",
  customInput,
  step = 1,
  setValue = () => {},
  trigger,
  watch,
  numberRegex = /^\d*$/,
  onClick = () => {},
  onFocus = () => {},
  onChange = () => {},
  onBlur = () => {},
  min,
  max,
}: InputProps) {
  // to show password
  const [show, setShow] = useState(false);

  function getError(errors: FieldErrors | undefined, name: string): any {
    let res: any = false;
    let currentErrors: any = errors;
    const names = name?.split(".");
    names?.map((subName) => {
      res = currentErrors?.[subName];
      currentErrors = currentErrors?.[subName];
    });
    return res;
  }
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
              disabled={disabled}
              onChange={(e) => {
                setValue(name, e?.target?.checked ? true : false);
                trigger?.(name);
                onChange({ trigger } as { trigger: UseFormTrigger<any> });
              }}
              checked={watch?.(name) ? true : false}
            />
            {/* checkbox presentation */}
            <div className="w-[20px] max-w-[20px] min-w-[20px] h-[20px] max-h-[20px] min-h-[20px] bg-secondary-background rounded-sm right-[2px] peer-checked:bg-secondary-foreground transition-all duration-[0.1s]"></div>

            <div>{label}</div>
            {element ? element : null}
          </label>
          {getError(errors, name) ? (
            <span className="text-error text-size14">
              {getError(errors, name)?.message}
            </span>
          ) : null}
        </div>
      ) : (
        // other normal inputs
        <div
          className={`flex flex-col w-full ${addingStyle}`}
          onClick={onClick}
        >
          {/* input label  */}
          {label ? (
            <label htmlFor={name} className={`mb-2 cursor-pointer ${labelStyle}`}>
              {label}
            </label>
          ) : null}

          {/* input container to link icon to its position */}
          <div className="relative w-full flex flex-col gap-2">
            {/* input with react hook form register control  */}
            {type == "custom" ? (
              <div className="custom-input">{customInput}</div>
            ) : type == "number" ? (
              <input
                type={"number"}
                placeholder={placeholder}
                id={name}
                {...(register ? register(name) : {})}
                disabled={disabled}
                className={`custom-input ${addingInputStyle}`}
                onChange={(e) => {
                  if (
                    numberRegex.test(e.target.value) &&
                    (!min || Number(e.target.value) >= min) &&
                    (!max || Number(e.target.value) <= max)
                  ) {
                    if (e.target.value === "") {
                      setValue(name, undefined);
                    } else {
                      setValue(name, Number(e.target.value));
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
                disabled={disabled}
                className={`custom-input rounded-lg border-2 h-[40px]  bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 placeholder:text-[#49515B80]  ${
                  getError(errors, name)
                    ? "border-red-500"
                    : "border-gold-background focus:ring-gold-background"
                } ${addingInputStyle}`}
                step={step}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            )}

            {/* show input content with password input type */}
            {type == "password" ? (
              <div
                className="text-primary-foreground/80 hover:text-primary-foreground/100 transition-all absolute h-max w-max left-4 top-[50%] -translate-y-[50%] flex justify-center items-center cursor-pointer"
                onClick={() => {
                  if (type == "password") setShow(!show);
                }}
              >
                {/* toggle icon depending on show value */}
                {show ? <FaEyeSlash /> : <FaEye />}
              </div>
            ) : null}

            {/* validation errors  */}
            {getError(errors, name) ? (
              <span className="text-error text-size14">
                {getError(errors, name)?.message}
              </span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default Input;
